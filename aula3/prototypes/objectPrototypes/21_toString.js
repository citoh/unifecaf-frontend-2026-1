/**
 * Object.toString
 *
 * O que faz:
 * Object.prototype.toString.call(valor) retorna uma tag com o tipo interno (útil para diferenciar Array, Date, etc.).
 *
 * Exemplo:
 * detectar tipos
 *
 * Impressão do resultado (saída esperada):
 * [object Array] | [object Date]
 */

console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(new Date()));
