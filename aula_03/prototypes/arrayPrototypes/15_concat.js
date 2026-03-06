/**
 * Array.prototype.concat
 *
 * O que faz:
 * Retorna um novo array combinando arrays/valores (não muta os originais).
 *
 * Exemplo:
 * concatenar arrays de ids
 *
 * Impressão do resultado (saída esperada):
 * [ 1, 2, 3, 4 ]
 */

const a = [1, 2];
const b = [3, 4];
const c = a.concat(b);
console.log(c);
