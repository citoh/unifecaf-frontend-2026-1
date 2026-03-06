/**
 * Array.prototype.filter
 *
 * O que faz:
 * Cria um novo array contendo apenas os elementos que passam em um teste (retornam true).
 *
 * Exemplo:
 * filtrar números pares
 *
 * Impressão do resultado (saída esperada):
 * [ 2, 4, 6 ]
 */

const nums = [1, 2, 3, 4, 5, 6];
const pares = nums.filter((n) => n % 2 === 0);
console.log(pares);
