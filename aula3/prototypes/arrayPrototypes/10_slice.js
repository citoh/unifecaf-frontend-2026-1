/**
 * Array.prototype.slice
 *
 * O que faz:
 * Retorna uma cópia rasa de uma parte do array (não muta o array).
 *
 * Exemplo:
 * pegar do índice 1 até antes do 3
 *
 * Impressão do resultado (saída esperada):
 * [ 'b', 'c' ]
 */

const letras = ['a', 'b', 'c', 'd'];
const parte = letras.slice(1, 3);
console.log(parte);
