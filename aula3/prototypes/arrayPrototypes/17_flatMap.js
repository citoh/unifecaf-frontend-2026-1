/**
 * Array.prototype.flatMap
 *
 * O que faz:
 * Mapeia e achata 1 nível em uma única operação.
 *
 * Exemplo:
 * transformar frases em palavras
 *
 * Impressão do resultado (saída esperada):
 * [ 'oi', 'mundo', 'olá', 'dev' ]
 */

const frases = ['oi mundo', 'olá dev'];
const palavras = frases.flatMap((f) => f.split(' '));
console.log(palavras);
