// Desenvolva "alunos" para que o sistema de estatísticas seja finalizado

const ALUNOS_DATA = require('./data.json');

const alunos = {

    data: ALUNOS_DATA.map(aluno => {
        return {
            ...aluno,
            idade: (
                data => {
                    const hoje = new Date();
                    const nasc = new Date(data);
                    return hoje.getFullYear() - nasc.getFullYear() -
                        (hoje < new Date(hoje.getFullYear(), nasc.getMonth(), nasc.getDate()));
                }
            )(aluno.dataNascimento)
        }
    }),

    total: 0,

    totalAlunosAprovados: 0,
    porcentagemAprovacao: 0,
    totalAlunosReprovados: 0,
    porcentagemReprovacao: 0,
    mediaDeNotas: 0,
    medianaDeNotas: 0,

    idadeMedia: 0,

    nomeAlunoMaisNovo: '-',
    idadeMaisNovo: 0,
    nomeAlunoMaisVelho: '-',
    idadeMaisVelho: 0,

    histogramPorcentagemNotasPorPontos: (ALUNOS_DATA.reduce((pontos, aluno) => {
        const nota = Math.trunc(aluno.mediaFinal); // 0..10
        if (!pontos[nota]) pontos[nota] = 0;
        pontos[nota]++;
        return pontos;
    }, {})),

    cursos: (ALUNOS_DATA.reduce((cursos, aluno) => {
        if (!cursos.some(c => c.nome === aluno.curso)) {
            const nomeCurso = aluno.curso;
            cursos.push({
                nome: aluno.curso,
                total: ALUNOS_DATA.filter(a => a.curso === nomeCurso).length,
                distribuicaoDeAlunos: 0,
                totalAlunosAprovados: 0,
                porcentagemAprovacao: 0,
                totalAlunosReprovados: 0,
                porcentagemReprovacao: 0,
                mediaDeNotas: 0,
                medianaDeNotas: 0,
                idadeMedia: 0,
                nomeAlunoMaisNovo: '',
                idadeMaisNovo: 0,
                nomeAlunoMaisVelho: '',
                idadeMaisVelho: 0,
                totalAlunosPorFaixaDeIdade: (min, max) => { return 0 },
                histogramPorcentagemNotasPorPontos: []
            });
        }
        return cursos;
    }, []).sort((a, b) => a.nome.localeCompare(b.nome))),

    nomeCursoMaiorPorcentagemAprovacao: '-',
    nomeCursoMenorPorcentagemAprovacao: '-',

    totalAlunosPorFaixaDeIdade: (min, max) => { return 0 },

}


let histogramaImpressao = Object.keys(alunos.histogramPorcentagemNotasPorPontos).length
    ? Object.entries(alunos.histogramPorcentagemNotasPorPontos).reduce((histograma, [ponto, qtd], _, array) => {
        const total = array.reduce((soma, [, v]) => soma + v, 0) || 1;
        const porcentagem = ((qtd / total) * 100).toFixed(1);

        return histograma + `       ${ponto} - ${porcentagem}%\n`;
    }, '')
    : '0';

let histogramaPorCursoImpressao = ''

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
`)

for (const curso of alunos.cursos) {
    console.log(`
    ${curso.nome.toUpperCase()}
    > Quantidade total de alunos: ${curso.total}
    > Porcentagem total de alunos fazendo o curso: ${curso.distribuicaoDeAlunos}%
    > Total de alunos aprovados: ${curso.totalAlunosAprovados} (${curso.porcentagemAprovacao}%)
    > Porcentagem de reprovação: ${curso.totalAlunosReprovados} (${curso.porcentagemReprovacao}%)
    > Média das notas: ${curso.mediaDeNotas}
    > Mediana das notas: ${curso.medianaDeNotas}
    > Idade media dos alunos: ${curso.idadeMedia}
    > Aluno mais novo: ${curso.nomeAlunoMaisNovo} (${curso.idadeMaisNovo} anos
    > Aluno mais velho: ${curso.nomeAlunoMaisVelho} (${curso.idadeMaisVelho} anos
    > Quantidade com menos de 17 - 20 anos: ${curso.totalAlunosPorFaixaDeIdade(17, 20)}
    > Quantidade com menos de 21 - 25 anos: ${curso.totalAlunosPorFaixaDeIdade(21, 25)}
    > Quantidade com menos de 26 - 30 anos: ${curso.totalAlunosPorFaixaDeIdade(26, 30)}
    > Quantidade com menos de 31+ anos: ${curso.totalAlunosPorFaixaDeIdade(31, 100)}
    > Histograma por notas:
${histogramaPorCursoImpressao}
`)
}