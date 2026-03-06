/**
 * Array.prototype.with
 *
 * O que faz:
 * Retorna uma cópia do array com o elemento do índice substituído (ES2023), sem mutar.
 *
 * Exemplo:
 * trocar o item do índice 1 por 'x' sem mutar
 *
 * Impressão do resultado (saída esperada):
 * Original: [ 'a', 'b', 'c' ] | Novo: [ 'a', 'x', 'c' ]
 */

const letras = ['a', 'b', 'c'];

const novo = letras.with ? letras.with(1, 'x') : (() => {
  const copy = [...letras];
  copy[1] = 'x';
  return copy;
})();

console.log('Original:', letras);
console.log('Novo:', novo);
