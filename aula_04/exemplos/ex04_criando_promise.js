const promessa = new Promise((resolve, reject) => {
  let sucesso = true;
  if (sucesso) {
    resolve("Operação concluída");
  } else {
    reject("Erro na operação");
  }
});