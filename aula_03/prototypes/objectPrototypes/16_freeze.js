/**
 * Object.freeze
 *
 * O que faz:
 * Object.freeze torna o objeto imutável no nível superficial (não pode adicionar/remover/alterar props).
 *
 * Exemplo:
 * tentar mutar após freeze
 *
 * Impressão do resultado (saída esperada):
 * Antes: 1 | Depois: 1
 */

const obj = { a: 1 };
Object.freeze(obj);

console.log('Antes:', obj.a);
obj.a = 2; // não altera
console.log('Depois:', obj.a);
