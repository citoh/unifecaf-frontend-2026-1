/**
 * Array.prototype.splice
 *
 * O que faz:
 * Remove/substitui/insere elementos no array *mutando* o original. Retorna os removidos.
 *
 * Exemplo:
 * remover 2 elementos a partir do índice 1 e inserir 'x'
 *
 * Impressão do resultado (saída esperada):
 * Removidos: [ 'b', 'c' ] | Resultado: [ 'a', 'x', 'd' ]
 */

const letras = ['a', 'b', 'c', 'd'];
const removidos = letras.splice(1, 2, 'x');
console.log('Removidos:', removidos);
console.log('Resultado:', letras);
