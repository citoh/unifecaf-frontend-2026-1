/**
 * Array.prototype.includes
 *
 * O que faz:
 * Verifica se o array contém um valor (comparação por SameValueZero; funciona com NaN).
 *
 * Exemplo:
 * verificar se contém NaN
 *
 * Impressão do resultado (saída esperada):
 * true
 */

const arr = [1, 2, NaN];
console.log(arr.includes(NaN));
