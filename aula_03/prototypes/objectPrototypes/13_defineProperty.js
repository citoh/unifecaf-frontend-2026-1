/**
 * Object.defineProperty
 *
 * O que faz:
 * Object.defineProperty define uma propriedade com descritores (writable, enumerable, configurable, get/set).
 *
 * Exemplo:
 * definir propriedade somente leitura
 *
 * Impressão do resultado (saída esperada):
 * id: 10 | Tentativa de alterar id (permanece): 10
 */

const obj = {};
Object.defineProperty(obj, 'id', {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false
});

console.log('id:', obj.id);
obj.id = 99; // não altera
console.log('Tentativa de alterar id (permanece):', obj.id);
