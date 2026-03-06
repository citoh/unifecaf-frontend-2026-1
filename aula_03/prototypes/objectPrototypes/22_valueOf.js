/**
 * Object.valueOf
 *
 * O que faz:
 * valueOf retorna o valor primitivo do objeto (ou padrão). Em wrappers (Number/String/Date) é bastante usado.
 *
 * Exemplo:
 * pegar timestamp de Date via valueOf
 *
 * Impressão do resultado (saída esperada):
 * timestamp (number): true
 */

const d = new Date('2020-01-01T00:00:00Z');
const ts = d.valueOf();
console.log('timestamp (number):', typeof ts === 'number');
