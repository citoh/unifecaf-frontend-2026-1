/**
 * Array - indexOf / lastIndexOf
 *
 * O que faz:
 * Retorna o índice da primeira/última ocorrência de um valor. Se não encontrar, retorna -1. Não encontra NaN.
 *
 * Exemplo:
 * encontrar primeira e última ocorrência de 2
 *
 * Impressão do resultado (saída esperada):
 * indexOf: 1 | lastIndexOf: 3
 */

const arr = [1, 2, 3, 2, 4];
console.log('indexOf:', arr.indexOf(2));
console.log('lastIndexOf:', arr.lastIndexOf(2));
