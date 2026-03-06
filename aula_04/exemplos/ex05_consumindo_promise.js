console.log('Carregando usuários...');

buscarDadosDoUsuario()
  .then(dados => {
    console.log("Dados recebidos:", dados);
  })
  .catch(erro => {
    console.error("Erro:", erro);
  });


function buscarDadosDoUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sucesso = true;
      if (sucesso) {
        resolve({
          id: 1,
          nome: "Ana",
          email: "ana@email.com"
        });
      } else {
        reject("Erro ao buscar dados do usuário");
      }
    }, 2000);
  });
}