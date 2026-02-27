/**
 * Object.getOwnPropertyNames
 *
 * O que faz:
 * Object.getOwnPropertyNames retorna todas as propriedades próprias (inclui não-enumeráveis).
 *
 * Exemplo:
 * comparar com Object.keys
 *
 * Impressão do resultado (saída esperada):
 * keys: [ 'a' ] | getOwnPropertyNames: [ 'a', 'b' ]
 */

const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });

console.log('keys:', Object.keys(obj));
console.log('getOwnPropertyNames:', Object.getOwnPropertyNames(obj));
