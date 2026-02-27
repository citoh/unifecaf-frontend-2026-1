/**
 * Array.prototype.findIndex
 *
 * O que faz:
 * Retorna o índice do primeiro elemento que satisfaz a condição. Se não encontrar, retorna -1.
 *
 * Exemplo:
 * achar o índice do primeiro número negativo
 *
 * Impressão do resultado (saída esperada):
 * 2
 */

const nums = [5, 3, -1, -9];
const idx = nums.findIndex((n) => n < 0);
console.log(idx);
