/**
 * Array.prototype.some
 *
 * O que faz:
 * Retorna true se pelo menos um elemento passar no teste; caso contrário, false.
 *
 * Exemplo:
 * verificar se há algum item caro (> 100)
 *
 * Impressão do resultado (saída esperada):
 * true
 */

const carrinho = [
  { nome: 'mouse', preco: 80 },
  { nome: 'teclado', preco: 150 }
];

const temCaro = carrinho.some((i) => i.preco > 100);
console.log(temCaro);
