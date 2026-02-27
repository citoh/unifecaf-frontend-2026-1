/**
 * Array.prototype.Array.from
 *
 * O que faz:
 * Cria um array a partir de iteráveis/array-like; pode aplicar função de mapeamento.
 *
 * Exemplo:
 * criar array [1..5] com mapFn
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 2, 3, 4, 5 ]
 */

const arr = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(arr);
