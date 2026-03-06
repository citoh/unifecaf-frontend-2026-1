/**
 * Object.getOwnPropertyDescriptors
 *
 * O que faz:
 * Retorna descritores de todas as propriedades próprias, útil para clonar preservando getters/setters.
 *
 * Exemplo:
 * ver descritores
 *
 * Impressão do resultado (saída esperada):
 * Tem getter em total? true
 */

const obj = {
  a: 1,
  get total() { return this.a + 1; }
};

const desc = Object.getOwnPropertyDescriptors(obj);
console.log('Tem getter em total?', typeof desc.total.get === 'function');
