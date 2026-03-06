/**
 * Array - push / pop
 *
 * O que faz:
 * push adiciona no final (muta) e retorna o novo length; pop remove do final e retorna o removido.
 *
 * Exemplo:
 * adicionar e remover no fim
 *
 * Impressão do resultado (saída esperada):
 * Depois do push: [ 1, 2, 3 ] | Removido: 3 | Final: [ 1, 2 ]
 */

const arr = [1, 2];
arr.push(3);
console.log('Depois do push:', arr);

const removido = arr.pop();
console.log('Removido:', removido);
console.log('Final:', arr);
