if (true) {
  let escopoBloco = "Visível apenas aqui";
  var escopoVazado = "Vaza para fora do if";
}

// console.log(escopoBloco); // ReferenceError
console.log(escopoVazado); // Funciona (problema do var)