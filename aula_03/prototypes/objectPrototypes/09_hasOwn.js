/**
 * Object.hasOwn
 *
 * O que faz:
 * Object.hasOwn(obj, prop) verifica se a propriedade é *própria* do objeto (não herdada).
 *
 * Exemplo:
 * diferenciar propriedade própria vs protótipo
 *
 * Impressão do resultado (saída esperada):
 * hasOwn(id): true | hasOwn(toString): false
 */

const obj = Object.create({ toString() { return 'proto'; }});
obj.id = 1;

console.log('hasOwn(id):', Object.hasOwn(obj, 'id'));
console.log('hasOwn(toString):', Object.hasOwn(obj, 'toString'));
