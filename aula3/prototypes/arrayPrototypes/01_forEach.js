/**
 * Array.prototype.forEach
 *
 * O que faz:
 * Percorre o array e executa uma função para cada item. Não retorna um novo array.
 *
 * Exemplo:
 * somar os preços e imprimir cada item
 *
 * Impressão do resultado (saída esperada):
 * Item: maçã | Item: banana | Soma: 7
 */

const items = [
  { nome: 'maçã', preco: 3 },
  { nome: 'banana', preco: 4 }
];

let soma = 0;

items.forEach((item) => {
  console.log(`Item: ${item.nome} - R$${item.preco},00`);
  soma += item.preco;
});

console.log('Soma:', `R$${soma},00`);
