/**
 * Object.destructuring
 *
 * O que faz:
 * Extrai propriedades para variáveis, podendo renomear e definir valores padrão.
 *
 * Exemplo:
 * pegar nome e país (default BR)
 *
 * Impressão do resultado (saída esperada):
 * nome: Ana | pais: BR
 */

const user = { id: 1, nome: 'Ana' };
const { nome, pais = 'BR' } = user;
console.log('nome:', nome, '| pais:', pais);
