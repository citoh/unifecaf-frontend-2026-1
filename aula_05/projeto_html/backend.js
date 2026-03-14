const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

function lerArquivoAlunos() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, '[]', 'utf8');
        }

        const conteudo = fs.readFileSync(DATA_FILE, 'utf8');
        const dados = JSON.parse(conteudo);

        return Array.isArray(dados) ? dados : [];
    } catch (error) {
        console.error('Erro ao ler data.json:', error);
        return [];
    }
}

function salvarArquivoAlunos(alunos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(alunos, null, 2), 'utf8');
}

function gerarId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function arredondar(valor, casas = 2) {
    return Number(Number(valor || 0).toFixed(casas));
}

function formatarDataBR(dataIso) {
    if (!dataIso) return '-';

    const data = new Date(`${dataIso}T00:00:00`);
    if (Number.isNaN(data.getTime())) return '-';

    return data.toLocaleDateString('pt-BR');
}

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 0;

    const hoje = new Date();
    const nascimento = new Date(`${dataNascimento}T00:00:00`);

    if (Number.isNaN(nascimento.getTime())) return 0;

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMes = hoje.getMonth() - nascimento.getMonth();

    if (
        diferencaMes < 0 ||
        (diferencaMes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }

    return idade;
}

function alunoAprovado(aluno) {
    if (typeof aluno.aprovado === 'boolean') return aluno.aprovado;
    if (typeof aluno.status === 'string') return aluno.status.toLowerCase() === 'aprovado';
    if (typeof aluno.situacao === 'string') return aluno.situacao.toLowerCase() === 'aprovado';

    return Number(aluno.mediaFinal) >= 7;
}

function normalizarAluno(aluno) {
    const dataNascimentoOriginal = aluno.dataNascimentoOriginal || aluno.dataNascimento || '';
    const mediaFinal = Number(aluno.mediaFinal);

    return {
        ...aluno,
        id: aluno.id || gerarId(),
        nome: aluno.nome || '',
        curso: aluno.curso || '',
        mediaFinal: Number.isNaN(mediaFinal) ? 0 : mediaFinal,
        dataNascimentoOriginal,
        dataNascimento: formatarDataBR(dataNascimentoOriginal),
        dataNascimentoFormatada: formatarDataBR(dataNascimentoOriginal),
        idade: calcularIdade(dataNascimentoOriginal)
    };
}

function obterAlunosNormalizados() {
    return lerArquivoAlunos().map(normalizarAluno);
}

function calcularMedia(lista) {
    if (!lista.length) return 0;

    const soma = lista.reduce((acc, valor) => acc + Number(valor || 0), 0);
    return arredondar(soma / lista.length);
}

function calcularMediana(lista) {
    if (!lista.length) return 0;

    const ordenada = [...lista].map(Number).sort((a, b) => a - b);
    const meio = Math.floor(ordenada.length / 2);

    if (ordenada.length % 2 === 0) {
        return arredondar((ordenada[meio - 1] + ordenada[meio]) / 2);
    }

    return arredondar(ordenada[meio]);
}

function contarPorFaixaDeIdade(lista, min, max) {
    return lista.filter(aluno => aluno.idade >= min && aluno.idade <= max).length;
}

function gerarHistograma(lista) {
    const contagem = {};

    for (const aluno of lista) {
        const nota = Math.trunc(Number(aluno.mediaFinal) || 0);
        contagem[nota] = (contagem[nota] || 0) + 1;
    }

    const total = lista.length || 1;

    return Object.fromEntries(
        Object.entries(contagem)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([nota, quantidade]) => [
                nota,
                {
                    quantidade,
                    porcentagem: arredondar((quantidade / total) * 100, 1)
                }
            ])
    );
}

function calcularResumo(lista, totalGeral = lista.length) {
    const total = lista.length;
    const aprovados = lista.filter(alunoAprovado);
    const reprovados = lista.filter(aluno => !alunoAprovado(aluno));
    const notas = lista.map(aluno => Number(aluno.mediaFinal) || 0);
    const idades = lista.map(aluno => aluno.idade || 0);

    let maisNovo = null;
    let maisVelho = null;

    for (const aluno of lista) {
        if (!maisNovo || aluno.idade < maisNovo.idade) {
            maisNovo = aluno;
        }

        if (!maisVelho || aluno.idade > maisVelho.idade) {
            maisVelho = aluno;
        }
    }

    return {
        total,
        distribuicaoDeAlunos: totalGeral ? arredondar((total / totalGeral) * 100) : 0,
        totalAlunosAprovados: aprovados.length,
        porcentagemAprovacao: total ? arredondar((aprovados.length / total) * 100) : 0,
        totalAlunosReprovados: reprovados.length,
        porcentagemReprovacao: total ? arredondar((reprovados.length / total) * 100) : 0,
        mediaDeNotas: calcularMedia(notas),
        medianaDeNotas: calcularMediana(notas),
        idadeMedia: calcularMedia(idades),
        nomeAlunoMaisNovo: maisNovo ? maisNovo.nome : '-',
        idadeMaisNovo: maisNovo ? maisNovo.idade : 0,
        nomeAlunoMaisVelho: maisVelho ? maisVelho.nome : '-',
        idadeMaisVelho: maisVelho ? maisVelho.idade : 0,
        faixasDeIdade: {
            '17-20': contarPorFaixaDeIdade(lista, 17, 20),
            '21-25': contarPorFaixaDeIdade(lista, 21, 25),
            '26-30': contarPorFaixaDeIdade(lista, 26, 30),
            '31+': contarPorFaixaDeIdade(lista, 31, 200)
        },
        histogramPorcentagemNotasPorPontos: gerarHistograma(lista)
    };
}

function gerarEstatisticas() {
    const alunos = obterAlunosNormalizados();
    const resumoGeral = calcularResumo(alunos, alunos.length);

    const mapaCursos = {};

    for (const aluno of alunos) {
        if (!mapaCursos[aluno.curso]) {
            mapaCursos[aluno.curso] = [];
        }

        mapaCursos[aluno.curso].push(aluno);
    }

    const cursos = Object.entries(mapaCursos)
        .map(([nome, lista]) => ({
            nome,
            ...calcularResumo(lista, alunos.length)
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));

    let cursoMaiorAprovacao = null;
    let cursoMenorAprovacao = null;

    for (const curso of cursos) {
        if (
            !cursoMaiorAprovacao ||
            curso.porcentagemAprovacao > cursoMaiorAprovacao.porcentagemAprovacao
        ) {
            cursoMaiorAprovacao = curso;
        }

        if (
            !cursoMenorAprovacao ||
            curso.porcentagemAprovacao < cursoMenorAprovacao.porcentagemAprovacao
        ) {
            cursoMenorAprovacao = curso;
        }
    }

    return {
        data: alunos,
        total: resumoGeral.total,
        totalAlunosAprovados: resumoGeral.totalAlunosAprovados,
        porcentagemAprovacao: resumoGeral.porcentagemAprovacao,
        totalAlunosReprovados: resumoGeral.totalAlunosReprovados,
        porcentagemReprovacao: resumoGeral.porcentagemReprovacao,
        mediaDeNotas: resumoGeral.mediaDeNotas,
        medianaDeNotas: resumoGeral.medianaDeNotas,
        idadeMedia: resumoGeral.idadeMedia,
        nomeAlunoMaisNovo: resumoGeral.nomeAlunoMaisNovo,
        idadeMaisNovo: resumoGeral.idadeMaisNovo,
        nomeAlunoMaisVelho: resumoGeral.nomeAlunoMaisVelho,
        idadeMaisVelho: resumoGeral.idadeMaisVelho,
        faixasDeIdade: resumoGeral.faixasDeIdade,
        histogramPorcentagemNotasPorPontos: resumoGeral.histogramPorcentagemNotasPorPontos,
        cursos,
        nomeCursoMaiorPorcentagemAprovacao: cursoMaiorAprovacao ? cursoMaiorAprovacao.nome : '-',
        nomeCursoMenorPorcentagemAprovacao: cursoMenorAprovacao ? cursoMenorAprovacao.nome : '-'
    };
}

function validarAluno(body) {
    const erros = [];

    if (!body.nome || typeof body.nome !== 'string' || !body.nome.trim()) {
        erros.push('Nome é obrigatório.');
    }

    if (!body.curso || typeof body.curso !== 'string' || !body.curso.trim()) {
        erros.push('Curso é obrigatório.');
    }

    if (!body.dataNascimento || typeof body.dataNascimento !== 'string') {
        erros.push('Data de nascimento é obrigatória.');
    }

    const mediaFinal = Number(body.mediaFinal);
    if (Number.isNaN(mediaFinal) || mediaFinal < 0 || mediaFinal > 10) {
        erros.push('Média final deve ser um número entre 0 e 10.');
    }

    return erros;
}

app.get('/', (req, res) => {
    try {
        const estatisticas = gerarEstatisticas();
        return res.status(200).json(estatisticas);
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao gerar estatísticas.',
            detalhe: error.message
        });
    }
});

app.get('/alunos', (req, res) => {
    try {
        const alunos = obterAlunosNormalizados();
        return res.status(200).json(alunos);
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao buscar alunos.',
            detalhe: error.message
        });
    }
});

app.post('/alunos', (req, res) => {
    try {
        const erros = validarAluno(req.body);

        if (erros.length) {
            return res.status(400).json({
                erro: 'Dados inválidos.',
                detalhes: erros
            });
        }

        const alunos = lerArquivoAlunos();

        const novoAluno = {
            id: gerarId(),
            nome: req.body.nome.trim(),
            curso: req.body.curso.trim(),
            dataNascimento: req.body.dataNascimento,
            mediaFinal: Number(req.body.mediaFinal)
        };

        alunos.push(novoAluno);
        salvarArquivoAlunos(alunos);

        return res.status(201).json({
            mensagem: 'Aluno cadastrado com sucesso.',
            aluno: normalizarAluno(novoAluno)
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao cadastrar aluno.',
            detalhe: error.message
        });
    }
});

app.put('/alunos/:id', (req, res) => {
    try {
        const erros = validarAluno(req.body);

        if (erros.length) {
            return res.status(400).json({
                erro: 'Dados inválidos.',
                detalhes: erros
            });
        }

        const alunos = lerArquivoAlunos();
        const index = alunos.findIndex(aluno => String(aluno.id) === String(req.params.id));

        if (index === -1) {
            return res.status(404).json({
                erro: 'Aluno não encontrado.'
            });
        }

        const alunoAtualizado = {
            ...alunos[index],
            nome: req.body.nome.trim(),
            curso: req.body.curso.trim(),
            dataNascimento: req.body.dataNascimento,
            mediaFinal: Number(req.body.mediaFinal)
        };

        alunos[index] = alunoAtualizado;
        salvarArquivoAlunos(alunos);

        return res.status(200).json({
            mensagem: 'Aluno atualizado com sucesso.',
            aluno: normalizarAluno(alunoAtualizado)
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao atualizar aluno.',
            detalhe: error.message
        });
    }
});

app.delete('/alunos/:id', (req, res) => {
    try {
        const alunos = lerArquivoAlunos();
        const index = alunos.findIndex(aluno => String(aluno.id) === String(req.params.id));

        if (index === -1) {
            return res.status(404).json({
                erro: 'Aluno não encontrado.'
            });
        }

        const [alunoRemovido] = alunos.splice(index, 1);
        salvarArquivoAlunos(alunos);

        return res.status(200).json({
            mensagem: 'Aluno removido com sucesso.',
            aluno: normalizarAluno(alunoRemovido)
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao remover aluno.',
            detalhe: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});