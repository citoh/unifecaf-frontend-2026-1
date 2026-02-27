/**
 * Object.assign
 *
 * O que faz:
 * Copia propriedades de um ou mais objetos para um alvo (muta o alvo).
 *
 * Exemplo:
 * mesclar configs
 *
 * Impressão do resultado (saída esperada):
 * { debug: true, env: 'prod' }
 */

const target = { debug: false };
Object.assign(target, { debug: true }, { env: 'prod' });
console.log(target);
