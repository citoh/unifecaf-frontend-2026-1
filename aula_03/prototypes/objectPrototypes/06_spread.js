/**
 * Object.spread
 *
 * O que faz:
 * Usa spread (...) para copiar/mesclar objetos de forma imutável (cria novo objeto).
 *
 * Exemplo:
 * atualizar um campo sem mutar o original
 *
 * Impressão do resultado (saída esperada):
 * Original: { id: 1, nome: 'Ana' } | Novo: { id: 1, nome: 'Bia' }
 */

const original = { id: 1, nome: 'Ana' };
const novo = { ...original, nome: 'Bia' };
console.log('Original:', original);
console.log('Novo:', novo);
