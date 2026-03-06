/**
 * Object.fromEntries
 *
 * O que faz:
 * Cria um objeto a partir de um array/iterável de pares [chave, valor].
 *
 * Exemplo:
 * converter entries em objeto
 *
 * Impressão do resultado (saída esperada):
 * { id: 1, nome: 'Ana' }
 */

const entries = [['id', 1], ['nome', 'Ana']];
const obj = Object.fromEntries(entries);
console.log(obj);
