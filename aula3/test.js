// =======================
// SELECIONE AQUI O QUE DESEJA TESTAR
// =======================
const category = 'array' // array | object
const prototypeName = 'filter'


// =======================
// ARRAY PROTOTYPES
// =======================
const arrayPrototypes = [
  { name: 'forEach', file: 'prototypes/arrayPrototypes/01_forEach.js' },
  { name: 'map', file: 'prototypes/arrayPrototypes/02_map.js' },
  { name: 'filter', file: 'prototypes/arrayPrototypes/03_filter.js' },
  { name: 'find', file: 'prototypes/arrayPrototypes/04_find.js' },
  { name: 'findIndex', file: 'prototypes/arrayPrototypes/05_findIndex.js' },
  { name: 'some', file: 'prototypes/arrayPrototypes/06_some.js' },
  { name: 'every', file: 'prototypes/arrayPrototypes/07_every.js' },
  { name: 'reduce', file: 'prototypes/arrayPrototypes/08_reduce.js' },
  { name: 'sort', file: 'prototypes/arrayPrototypes/09_sort.js' },
  { name: 'slice', file: 'prototypes/arrayPrototypes/10_slice.js' },
  { name: 'splice', file: 'prototypes/arrayPrototypes/11_splice.js' },
  { name: 'includes', file: 'prototypes/arrayPrototypes/12_includes.js' },
  { name: 'indexOf / lastIndexOf', file: 'prototypes/arrayPrototypes/13_indexOf_lastIndexOf.js' },
  { name: 'join', file: 'prototypes/arrayPrototypes/14_join.js' },
  { name: 'concat', file: 'prototypes/arrayPrototypes/15_concat.js' },
  { name: 'flat', file: 'prototypes/arrayPrototypes/16_flat.js' },
  { name: 'flatMap', file: 'prototypes/arrayPrototypes/17_flatMap.js' },
  { name: 'reverse', file: 'prototypes/arrayPrototypes/18_reverse.js' },
  { name: 'at', file: 'prototypes/arrayPrototypes/19_at.js' },
  { name: 'push / pop', file: 'prototypes/arrayPrototypes/20_push_pop.js' },
  { name: 'unshift / shift', file: 'prototypes/arrayPrototypes/21_unshift_shift.js' },
  { name: 'fill', file: 'prototypes/arrayPrototypes/22_fill.js' },
  { name: 'Array.from', file: 'prototypes/arrayPrototypes/23_Array_from.js' },
  { name: 'entries / keys / values', file: 'prototypes/arrayPrototypes/24_entries_keys_values.js' },
  { name: 'reduceRight', file: 'prototypes/arrayPrototypes/25_reduceRight.js' },
  { name: 'toSorted / toReversed', file: 'prototypes/arrayPrototypes/26_toSorted_toReversed.js' },
  { name: 'toSpliced', file: 'prototypes/arrayPrototypes/27_toSpliced.js' },
  { name: 'with', file: 'prototypes/arrayPrototypes/28_with.js' },
  { name: 'copyWithin', file: 'prototypes/arrayPrototypes/29_copyWithin.js' },
  { name: 'groupBy (reduce)', file: 'prototypes/arrayPrototypes/30_groupBy_style_reduce.js' }
]

// =======================
// OBJECT PROTOTYPES
// =======================
const objectPrototypes = [
  { name: 'keys', file: 'prototypes/objectPrototypes/01_keys.js' },
  { name: 'values', file: 'prototypes/objectPrototypes/02_values.js' },
  { name: 'entries', file: 'prototypes/objectPrototypes/03_entries.js' },
  { name: 'fromEntries', file: 'prototypes/objectPrototypes/04_fromEntries.js' },
  { name: 'assign', file: 'prototypes/objectPrototypes/05_assign.js' },
  { name: 'spread', file: 'prototypes/objectPrototypes/06_spread.js' },
  { name: 'destructuring', file: 'prototypes/objectPrototypes/07_destructuring.js' },
  { name: 'optional chaining', file: 'prototypes/objectPrototypes/08_optionalChaining.js' },
  { name: 'hasOwn', file: 'prototypes/objectPrototypes/09_hasOwn.js' },
  { name: 'hasOwnProperty', file: 'prototypes/objectPrototypes/10_hasOwnProperty.js' },
  { name: 'create', file: 'prototypes/objectPrototypes/11_create.js' },
  { name: 'prototypeOf', file: 'prototypes/objectPrototypes/12_prototypeOf.js' },
  { name: 'defineProperty', file: 'prototypes/objectPrototypes/13_defineProperty.js' },
  { name: 'getOwnPropertyNames', file: 'prototypes/objectPrototypes/14_getOwnPropertyNames.js' },
  { name: 'getOwnPropertyDescriptors', file: 'prototypes/objectPrototypes/15_getOwnPropertyDescriptors.js' },
  { name: 'freeze', file: 'prototypes/objectPrototypes/16_freeze.js' },
  { name: 'seal', file: 'prototypes/objectPrototypes/17_seal.js' },
  { name: 'preventExtensions', file: 'prototypes/objectPrototypes/18_preventExtensions.js' },
  { name: 'is', file: 'prototypes/objectPrototypes/19_is.js' },
  { name: 'propertyIsEnumerable', file: 'prototypes/objectPrototypes/20_propertyIsEnumerable.js' },
  { name: 'toString', file: 'prototypes/objectPrototypes/21_toString.js' },
  { name: 'valueOf', file: 'prototypes/objectPrototypes/22_valueOf.js' },
  { name: 'groupByCurso', file: 'prototypes/objectPrototypes/23_groupByCurso.js' }
]

const groups = { array: arrayPrototypes, object: objectPrototypes }
const list = groups[category]

if (!list) {
  console.error("❌ Categoria inválida. Use 'array' ou 'object'.")
  process.exit(1)
}

const selected = list.find(
  (item) => item.name.toLowerCase() === prototypeName.toLowerCase()
)

if (!selected) {
  console.error(`❌ Prototype '${prototypeName}' não encontrado em '${category}'.`)
  console.log('\n✅ Opções disponíveis:')
  list.forEach((item) => console.log(`- ${item.name}`))
  process.exit(1)
}

console.log(`🚀 Rodando: ${category} -> ${selected.name}`)
console.log(`📂 Arquivo: ${selected.file}\n`)

require(`./${selected.file}`)