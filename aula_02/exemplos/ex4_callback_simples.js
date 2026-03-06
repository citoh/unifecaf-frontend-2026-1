// Callback simples

function executarOperacao(numero, callback) {
  callback(numero);
}

executarOperacao(5, (n) => {
  console.log("Resultado:", n * 2);
});