async function carregarPerfil() {
  const dados = await buscarDadosDoUsuario();
  console.log(dados);
}


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

carregarPerfil()