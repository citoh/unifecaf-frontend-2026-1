/**
 * Array - entries / keys / values
 *
 * O que faz:
 * Retorna iteradores: entries() -> [index, value], keys() -> índices, values() -> valores.
 *
 * Exemplo:
 * iterar entries
 *
 * Impressão do resultado (saída esperada):
 * 0 a | 1 b
 */

const letras = ['a', 'b'];

for (const [i, v] of letras.entries()) {
  console.log(i, v);
}
