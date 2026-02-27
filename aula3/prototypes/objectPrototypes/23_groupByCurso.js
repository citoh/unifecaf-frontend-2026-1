/**
 * Object.groupByCurso
 *
 * O que faz:
 * Exemplo prático: agrupar alunos por curso usando Object + reduce (resultado é um objeto de arrays).
 *
 * Exemplo:
 * agrupar alunos por curso
 *
 * Impressão do resultado (saída esperada):
 * { JS: [ 'Ana', 'Caio' ], Python: [ 'Bia' ] }
 */

const alunos = [
  { nome: 'Ana', curso: 'JS' },
  { nome: 'Bia', curso: 'Python' },
  { nome: 'Caio', curso: 'JS' }
];

const porCurso = alunos.reduce((acc, a) => {
  (acc[a.curso] ??= []).push(a.nome);
  return acc;
}, {});

console.log(porCurso);
