/**
 * Array.prototype.reduceRight
 *
 * O que faz:
 * Como reduce, mas processa do último elemento para o primeiro.
 *
 * Exemplo:
 * concatenar letras da direita para a esquerda
 *
 * Impressão do resultado (saída esperada):
 * cba
 */

const letras = ['a', 'b', 'c'];
const res = letras.reduceRight((acc, v) => acc + v, '');
console.log(res);
