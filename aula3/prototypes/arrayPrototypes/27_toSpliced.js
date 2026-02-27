/**
 * Array.prototype.toSpliced
 *
 * O que faz:
 * Versão *imutável* de splice(): retorna um novo array com a alteração, sem mutar o original (ES2023).
 *
 * Exemplo:
 * remover 1 elemento no índice 1 e inserir 'x' sem mutar
 *
 * Impressão do resultado (saída esperada):
 * Original: [ 'a', 'b', 'c' ] | Novo: [ 'a', 'x', 'c' ]
 */

const letras = ['a', 'b', 'c'];

const novo = letras.toSpliced ? letras.toSpliced(1, 1, 'x') : (() => {
  const copy = [...letras];
  copy.splice(1, 1, 'x');
  return copy;
})();

console.log('Original:', letras);
console.log('Novo:', novo);
