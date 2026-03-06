/**
 * Array.prototype.reduce
 *
 * O que faz:
 * Reduz o array a um único valor acumulando o resultado de uma função.
 *
 * Exemplo:
 * somar valores
 *
 * Impressão do resultado (saída esperada):
 * Total: 15
 */

const nums = [1, 2, 3, 4, 5];
const total = nums.reduce((acc, n) => acc + n, 0);
console.log('Total:', total);
