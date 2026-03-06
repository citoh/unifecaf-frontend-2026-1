/**
 * Array.prototype.sort
 *
 * O que faz:
 * Ordena o array *in-place* (muta o array) com base em uma função de comparação.
 *
 * Exemplo:
 * ordenar números em ordem crescente sem erro de ordenação lexicográfica
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 2, 10, 20 ]
 */

const nums = [10, 2, 1, 20];
nums.sort((a, b) => a - b);
console.log(nums);
