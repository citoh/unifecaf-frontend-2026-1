/**
 * Array - groupBy (reduce)
 *
 * O que faz:
 * Exemplo de 'groupBy' usando reduce, agrupando itens por uma chave.
 *
 * Exemplo:
 * agrupar pessoas por idade
 *
 * Impressão do resultado (saída esperada):
 * { '18': [ 'Ana' ], '20': [ 'Bia', 'Caio' ] }
 */

const pessoas = [
  { nome: 'Ana', idade: 18 },
  { nome: 'Bia', idade: 20 },
  { nome: 'Caio', idade: 20 }
];

const agrupado = pessoas.reduce((acc, p) => {
  const key = String(p.idade);
  if (!acc[key]) acc[key] = [];
  acc[key].push(p.nome);
  return acc;
}, {});

console.log(agrupado);
