/**
 * Array.prototype.map
 *
 * O que faz:
 * Cria um novo array aplicando uma função a cada elemento do array original.
 *
 * Exemplo:
 * transformar nomes em maiúsculas
 *
 * Impressão do resultado (saída esperada):
 * [ 'ANA', 'BRUNO', 'CARLA' ]
 */

const nomes = ['Ana', 'Bruno', 'Carla'];
const upper = nomes.map((n) => n.toUpperCase());
console.log('Nomes originais -> ', nomes);
console.log('Nomes após map -> ',upper);
