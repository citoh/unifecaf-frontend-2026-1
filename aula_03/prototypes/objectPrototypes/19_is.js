/**
 * Object.is
 *
 * O que faz:
 * Object.is compara valores como ===, mas trata NaN como igual a NaN e diferencia +0 de -0.
 *
 * Exemplo:
 * comparar NaN e zeros
 *
 * Impressão do resultado (saída esperada):
 * NaN: true | +0 vs -0: false
 */

console.log('NaN:', Object.is(NaN, NaN));
console.log('+0 vs -0:', Object.is(+0, -0));
