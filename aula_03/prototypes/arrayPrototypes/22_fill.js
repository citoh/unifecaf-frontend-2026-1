/**
 * Array.prototype.fill
 *
 * O que faz:
 * Preenche (muta) o array com um valor, opcionalmente entre índices start e end.
 *
 * Exemplo:
 * preencher do índice 1 ao 3 com 0
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 0, 0, 4 ]
 */

const arr = [1, 2, 3, 4];
arr.fill(0, 1, 3);
console.log(arr);
