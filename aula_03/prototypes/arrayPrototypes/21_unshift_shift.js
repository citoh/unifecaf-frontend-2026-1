/**
 * Array - unshift / shift
 *
 * O que faz:
 * unshift adiciona no início (muta) e retorna o novo length; shift remove do início e retorna o removido.
 *
 * Exemplo:
 * adicionar e remover no começo
 *
 * Impressão do resultado (saída esperada):
 * Depois do unshift: [ 0, 1, 2 ] | Removido: 0 | Final: [ 1, 2 ]
 */

const arr = [1, 2];
arr.unshift(0);
console.log('Depois do unshift:', arr);

const removido = arr.shift();
console.log('Removido:', removido);
console.log('Final:', arr);
