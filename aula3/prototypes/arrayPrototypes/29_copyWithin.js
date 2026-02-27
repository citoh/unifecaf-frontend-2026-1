/**
 * Array.prototype.copyWithin
 *
 * O que faz:
 * Copia uma parte do array para outra posição dentro do mesmo array (muta).
 *
 * Exemplo:
 * copiar a partir do índice 0 para o índice 2
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 2, 1, 2 ]
 */

const arr = [1, 2, 3, 4];
arr.copyWithin(2, 0, 2); // copia [1,2] para começar no índice 2
console.log(arr);
