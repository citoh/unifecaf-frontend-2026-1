/**
 * Object.propertyIsEnumerable
 *
 * O que faz:
 * obj.propertyIsEnumerable(prop) diz se a propriedade é própria e enumerável.
 *
 * Exemplo:
 * checar enumerabilidade
 *
 * Impressão do resultado (saída esperada):
 * a enumerable? true | b enumerable? false
 */

const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });

console.log('a enumerable?', obj.propertyIsEnumerable('a'));
console.log('b enumerable?', obj.propertyIsEnumerable('b'));
