/**
 * Array.prototype.every
 *
 * O que faz:
 * Retorna true se todos os elementos passarem no teste; caso contrário, false.
 *
 * Exemplo:
 * verificar se todos são maiores de idade
 *
 * Impressão do resultado (saída esperada):
 * false
 */

const idades = [18, 21, 17, 30];
const todosMaior = idades.every((i) => i >= 18);
console.log(todosMaior);
