/**
 * Array.prototype.flat
 *
 * O que faz:
 * Cria um novo array 'achatando' subarrays até a profundidade informada (padrão 1).
 *
 * Exemplo:
 * achatar 2 níveis
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 2, 3, 4, 5 ]
 */

const arr = [1, [2, [3, 4]], 5];
console.log(arr.flat(2));
