// Desenvolva "alunos" para que o sistema de estatísticas seja finalizado

const ALUNOS_DATA = require('./data.json');

const alunos = {

    data: ALUNOS_DATA.map(aluno => {
        return {
            ...aluno,
            idade: (// adicionando idade a partir da data de nascimento
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
    idadeMedia: 0,
    nomeAlunoMaisNovo: '',
    idadeMaisNovo: 0,
    nomeAlunoMaisVelho: '',
    idadeMaisVelho: 0,
    totalAlunosPorFaixaDeIdade: (min, max) => { return 0 },

    cursos: (ALUNOS_DATA.reduce((cursos, aluno) => {
        if (!cursos.some(c => c.nome === aluno.curso)) {
            const nomeCurso = aluno.curso
            cursos.push({
                nome: aluno.curso,
                total: ALUNOS_DATA.filter(a => a.curso === nomeCurso).length,
                totalAlunosAprovados: 0,
                porcentagemAprovacao: 0,
                totalAlunosReprovados: 0,
                porcentagemReprovacao: 0,
                idadeMedia: 0,
                nomeAlunoMaisNovo: '',
                idadeMaisNovo: 0,
                nomeAlunoMaisVelho: '',
                idadeMaisVelho: 0,
                totalAlunosPorFaixaDeIdade: (min, max) => { return 0 }
            });
        }
        return cursos;
    }, []).sort((a, b) => a.nome.localeCompare(b.nome))),

}


console.log(`
    
    ESTATÍSTICAS TOTAIS ===================================

    > Quantidade total de alunos: ${alunos.total}
    > Total de alunos aprovados: ${alunos.totalAlunosAprovados} (${alunos.porcentagemAprovacao}%)
    > Porcentagem de reprovação: ${alunos.totalAlunosReprovados} (${alunos.porcentagemReprovacao}%)
    > Idade media dos alunos: ${alunos.idadeMedia}
    > Aluno mais novo: ${alunos.nomeAlunoMaisNovo} (${alunos.idadeMaisNovo} anos
    > Aluno mais velho: ${alunos.nomeAlunoMaisVelho} (${alunos.idadeMaisVelho} anos
    > Quantidade com menos de 30 anos: ${alunos.totalAlunosPorFaixaDeIdade(0, 30)}
    > Quantidade com mais de 30 anos: ${alunos.totalAlunosPorFaixaDeIdade(30, 100)}

    ESTATÍSTICAS POR CURSO ================================
`)

for (curso of alunos.cursos.sort((a, b) => a.nome.localeCompare(b.nome))) {
    console.log(`
    ${curso.nome.toUpperCase()}
    > Quantidade total de alunos: ${curso.total}
    > Total de alunos aprovados: ${curso.totalAlunosAprovados} (${curso.porcentagemAprovacao}%)
    > Porcentagem de reprovação: ${curso.totalAlunosReprovados} (${curso.porcentagemReprovacao}%)
    > Idade media dos alunos: ${curso.idadeMedia}
    > Aluno mais novo: ${curso.nomeAlunoMaisNovo} (${curso.idadeMaisNovo} anos
    > Aluno mais velho: ${curso.nomeAlunoMaisVelho} (${curso.idadeMaisVelho} anos
    > Quantidade com menos de 30 anos: ${curso.totalAlunosPorFaixaDeIdade(0, 30)}
    > Quantidade com mais de 30 anos: ${curso.totalAlunosPorFaixaDeIdade(30, 100)}
`)
}