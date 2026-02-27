/**
 * Object.seal
 *
 * O que faz:
 * Object.seal impede adicionar/remover propriedades, mas permite alterar valores de propriedades existentes (se writable).
 *
 * Exemplo:
 * tentar adicionar e alterar
 *
 * Impressão do resultado (saída esperada):
 * a: 2 | tem b? false
 */

const obj = { a: 1 };
Object.seal(obj);

obj.a = 2;
obj.b = 3; // não adiciona
console.log('a:', obj.a, '| tem b?', 'b' in obj);
