/**
 * Object.preventExtensions
 *
 * O que faz:
 * Object.preventExtensions impede adicionar novas propriedades, mas permite remover/alterar existentes (dependendo de descriptors).
 *
 * Exemplo:
 * tentar adicionar nova propriedade
 *
 * Impressão do resultado (saída esperada):
 * tem b? false
 */

const obj = { a: 1 };
Object.preventExtensions(obj);

obj.b = 2;
console.log('tem b?', 'b' in obj);
