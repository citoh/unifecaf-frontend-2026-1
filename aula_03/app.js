const ALUNOS_DATA = require('./data.json');

const calcularIdade = (data) => {
    const hoje = new Date();
    const nasc = new Date(data);

    return hoje.getFullYear() - nasc.getFullYear() -
        (hoje < new Date(hoje.getFullYear(), nasc.getMonth(), nasc.getDate()));
};

const calcularMedia = (numeros) => {
    if (!numeros.length) return 0;
    return +(numeros.reduce((soma, n) => soma + n, 0) / numeros.length).toFixed(2);
};

const calcularMediana = (numeros) => {
    if (!numeros.length) return 0;

    const ordenados = [...numeros].sort((a, b) => a - b);
    const meio = Math.floor(ordenados.length / 2);

    if (ordenados.length % 2 === 0) {
        return +(((ordenados[meio - 1] + ordenados[meio]) / 2).toFixed(2));
    }

    return +ordenados[meio].toFixed(2);
};

const gerarHistograma = (lista) => {
    const histograma = {};

    for (const aluno of lista) {
        const nota = Math.trunc(aluno.mediaFinal); // 0..10
        if (!histograma[nota]) histograma[nota] = 0;
        histograma[nota]++;
    }

    return histograma;
};

const totalPorFaixa = (lista, min, max) => {
    return lista.filter(aluno => aluno.idade >= min && aluno.idade <= max).length;
};

const isAprovado = (aluno) => {
    if (typeof aluno.aprovado === 'boolean') return aluno.aprovado;
    if (typeof aluno.status === 'string') return aluno.status.toLowerCase() === 'aprovado';
    if (typeof aluno.situacao === 'string') return aluno.situacao.toLowerCase() === 'aprovado';

    return aluno.mediaFinal >= 7;
};

const alunosComIdade = ALUNOS_DATA.map(aluno => ({
    ...aluno,
    idade: calcularIdade(aluno.dataNascimento)
}));

const cursosBase = [...new Set(ALUNOS_DATA.map(aluno => aluno.curso))]
    .sort((a, b) => a.localeCompare(b))
    .map(nomeCurso => {
        const alunosDoCurso = alunosComIdade.filter(aluno => aluno.curso === nomeCurso);
        const aprovados = alunosDoCurso.filter(isAprovado);
        const reprovados = alunosDoCurso.filter(aluno => !isAprovado(aluno));
        const notas = alunosDoCurso.map(aluno => aluno.mediaFinal);
        const maisNovo = [...alunosDoCurso].sort((a, b) => a.idade - b.idade)[0];
        const maisVelho = [...alunosDoCurso].sort((a, b) => b.idade - a.idade)[0];

        return {
            nome: nomeCurso,
            total: alunosDoCurso.length,
            distribuicaoDeAlunos: +((alunosDoCurso.length / alunosComIdade.length) * 100).toFixed(2),
            totalAlunosAprovados: aprovados.length,
            porcentagemAprovacao: alunosDoCurso.length
                ? +((aprovados.length / alunosDoCurso.length) * 100).toFixed(2)
                : 0,
            totalAlunosReprovados: reprovados.length,
            porcentagemReprovacao: alunosDoCurso.length
                ? +((reprovados.length / alunosDoCurso.length) * 100).toFixed(2)
                : 0,
            mediaDeNotas: calcularMedia(notas),
            medianaDeNotas: calcularMediana(notas),
            idadeMedia: calcularMedia(alunosDoCurso.map(aluno => aluno.idade)),
            nomeAlunoMaisNovo: maisNovo?.nome || '-',
            idadeMaisNovo: maisNovo?.idade || 0,
            nomeAlunoMaisVelho: maisVelho?.nome || '-',
            idadeMaisVelho: maisVelho?.idade || 0,
            totalAlunosPorFaixaDeIdade: (min, max) => totalPorFaixa(alunosDoCurso, min, max),
            histogramPorcentagemNotasPorPontos: gerarHistograma(alunosDoCurso)
        };
    });

const cursoMaiorAprovacao = [...cursosBase].sort((a, b) => b.porcentagemAprovacao - a.porcentagemAprovacao)[0];
const cursoMenorAprovacao = [...cursosBase].sort((a, b) => a.porcentagemAprovacao - b.porcentagemAprovacao)[0];

const aprovadosTotal = alunosComIdade.filter(isAprovado);
const reprovadosTotal = alunosComIdade.filter(aluno => !isAprovado(aluno));
const notasTotais = alunosComIdade.map(aluno => aluno.mediaFinal);
const maisNovoGeral = [...alunosComIdade].sort((a, b) => a.idade - b.idade)[0];
const maisVelhoGeral = [...alunosComIdade].sort((a, b) => b.idade - a.idade)[0];

const alunos = {
    data: alunosComIdade,

    total: alunosComIdade.length,

    totalAlunosAprovados: aprovadosTotal.length,
    porcentagemAprovacao: alunosComIdade.length
        ? +((aprovadosTotal.length / alunosComIdade.length) * 100).toFixed(2)
        : 0,
    totalAlunosReprovados: reprovadosTotal.length,
    porcentagemReprovacao: alunosComIdade.length
        ? +((reprovadosTotal.length / alunosComIdade.length) * 100).toFixed(2)
        : 0,
    mediaDeNotas: calcularMedia(notasTotais),
    medianaDeNotas: calcularMediana(notasTotais),

    idadeMedia: calcularMedia(alunosComIdade.map(aluno => aluno.idade)),

    nomeAlunoMaisNovo: maisNovoGeral?.nome || '-',
    idadeMaisNovo: maisNovoGeral?.idade || 0,
    nomeAlunoMaisVelho: maisVelhoGeral?.nome || '-',
    idadeMaisVelho: maisVelhoGeral?.idade || 0,

    histogramPorcentagemNotasPorPontos: gerarHistograma(alunosComIdade),

    cursos: cursosBase,

    nomeCursoMaiorPorcentagemAprovacao: cursoMaiorAprovacao?.nome || '-',
    nomeCursoMenorPorcentagemAprovacao: cursoMenorAprovacao?.nome || '-',

    totalAlunosPorFaixaDeIdade: (min, max) => totalPorFaixa(alunosComIdade, min, max),
};


let histogramaImpressao = Object.keys(alunos.histogramPorcentagemNotasPorPontos).length
    ? Object.entries(alunos.histogramPorcentagemNotasPorPontos).reduce((histograma, [ponto, qtd], _, array) => {
        const total = array.reduce((soma, [, v]) => soma + v, 0) || 1;
        const porcentagem = ((qtd / total) * 100).toFixed(1);

        return histograma + `       ${ponto} - ${porcentagem}%\n`;
    }, '')
    : '0';

console.log(`
    
    ESTATÍSTICAS TOTAIS ===================================

    > Quantidade total de alunos: ${alunos.total}
    > Total de alunos aprovados: ${alunos.totalAlunosAprovados} (${alunos.porcentagemAprovacao}%)
    > Porcentagem de reprovação: ${alunos.totalAlunosReprovados} (${alunos.porcentagemReprovacao}%)
    > Curso com maior procentagem de aprovações: ${alunos.nomeCursoMaiorPorcentagemAprovacao}
    > Curso com menor procentagem de aprovações: ${alunos.nomeCursoMenorPorcentagemAprovacao}
    > Média das notas: ${alunos.mediaDeNotas}
    > Mediana das notas: ${alunos.medianaDeNotas}

    > Idade media dos alunos: ${alunos.idadeMedia}
    > Aluno mais novo: ${alunos.nomeAlunoMaisNovo} (${alunos.idadeMaisNovo}) anos
    > Aluno mais velho: ${alunos.nomeAlunoMaisVelho} (${alunos.idadeMaisVelho}) anos
    > Quantidade com menos de 17 - 20 anos: ${alunos.totalAlunosPorFaixaDeIdade(17, 20)}
    > Quantidade com menos de 21 - 25 anos: ${alunos.totalAlunosPorFaixaDeIdade(21, 25)}
    > Quantidade com menos de 26 - 30 anos: ${alunos.totalAlunosPorFaixaDeIdade(26, 30)}
    > Quantidade com menos de 31+ anos: ${alunos.totalAlunosPorFaixaDeIdade(31, 100)} 
    > Histograma por notas:
${histogramaImpressao}
    ESTATÍSTICAS POR CURSO ================================
`);

for (const curso of alunos.cursos) {
    const histogramaPorCursoImpressao = Object.keys(curso.histogramPorcentagemNotasPorPontos).length
        ? Object.entries(curso.histogramPorcentagemNotasPorPontos).reduce((histograma, [ponto, qtd], _, array) => {
            const total = array.reduce((soma, [, v]) => soma + v, 0) || 1;
            const porcentagem = ((qtd / total) * 100).toFixed(1);

            return histograma + `       ${ponto} - ${porcentagem}%\n`;
        }, '')
        : '0';

    console.log(`
    ${curso.nome.toUpperCase()}
    > Quantidade total de alunos: ${curso.total}
    > Porcentagem total de alunos fazendo o curso: ${curso.distribuicaoDeAlunos}%
    > Total de alunos aprovados: ${curso.totalAlunosAprovados} (${curso.porcentagemAprovacao}%)
    > Porcentagem de reprovação: ${curso.totalAlunosReprovados} (${curso.porcentagemReprovacao}%)
    > Média das notas: ${curso.mediaDeNotas}
    > Mediana das notas: ${curso.medianaDeNotas}
    > Idade media dos alunos: ${curso.idadeMedia}
    > Aluno mais novo: ${curso.nomeAlunoMaisNovo} (${curso.idadeMaisNovo}) anos
    > Aluno mais velho: ${curso.nomeAlunoMaisVelho} (${curso.idadeMaisVelho}) anos
    > Quantidade com menos de 17 - 20 anos: ${curso.totalAlunosPorFaixaDeIdade(17, 20)}
    > Quantidade com menos de 21 - 25 anos: ${curso.totalAlunosPorFaixaDeIdade(21, 25)}
    > Quantidade com menos de 26 - 30 anos: ${curso.totalAlunosPorFaixaDeIdade(26, 30)}
    > Quantidade com menos de 31+ anos: ${curso.totalAlunosPorFaixaDeIdade(31, 100)}
    > Histograma por notas:
${histogramaPorCursoImpressao}
`);
}