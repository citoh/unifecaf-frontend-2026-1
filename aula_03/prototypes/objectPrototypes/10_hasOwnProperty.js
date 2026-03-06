/**
 * Object.hasOwnProperty
 *
 * O que faz:
 * obj.hasOwnProperty(prop) verifica propriedade própria. Cuidado com objetos sem protótipo (Object.create(null)).
 *
 * Exemplo:
 * verificar propriedade e fallback seguro
 *
 * Impressão do resultado (saída esperada):
 * Direto: true | Seguro: true
 */

const obj = { a: 1 };

console.log('Direto:', obj.hasOwnProperty('a'));

// Forma segura (funciona até com Object.create(null)):
console.log('Seguro:', Object.prototype.hasOwnProperty.call(obj, 'a'));
