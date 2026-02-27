/**
 * Array - toSorted / toReversed
 *
 * O que faz:
 * Alternativas *imutáveis* (retornam cópias) para sort() e reverse() em runtimes que suportam ES2023.
 *
 * Exemplo:
 * ordenar sem mutar e reverter sem mutar
 *
 * Impressão do resultado (saída esperada):
 * Original: [ 3, 1, 2 ] | toSorted: [ 1, 2, 3 ] | toReversed: [ 2, 1, 3 ]
 */

const nums = [3, 1, 2];

// Fallback simples caso o runtime não suporte:
const sorted = nums.toSorted ? nums.toSorted((a, b) => a - b) : [...nums].sort((a, b) => a - b);
const reversed = nums.toReversed ? nums.toReversed() : [...nums].reverse();

console.log('Original:', nums);
console.log('toSorted:', sorted);
console.log('toReversed:', reversed);
