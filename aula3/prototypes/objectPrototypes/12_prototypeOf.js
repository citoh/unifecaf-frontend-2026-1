/**
 * Object.prototypeOf
 *
 * O que faz:
 * Object.getPrototypeOf(obj) retorna o protótipo de um objeto; Object.setPrototypeOf altera (evite em hot paths).
 *
 * Exemplo:
 * inspecionar protótipo
 *
 * Impressão do resultado (saída esperada):
 * É proto? true
 */

const proto = { x: 1 };
const obj = Object.create(proto);

const p = Object.getPrototypeOf(obj);
console.log('É proto?', p === proto);
