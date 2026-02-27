/**
 * Object.entries
 *
 * O que faz:
 * Retorna um array de pares [chave, valor] (enumeráveis) do objeto.
 *
 * Exemplo:
 * iterar entries
 *
 * Impressão do resultado (saída esperada):
 * [ [ 'id', 1 ], [ 'nome', 'Ana' ] ]
 */

const user = { id: 1, nome: 'Ana' };
console.log(Object.entries(user));
