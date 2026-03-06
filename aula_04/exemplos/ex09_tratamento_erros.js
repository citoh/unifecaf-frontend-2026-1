async function carregarPerfil() {
  try {
    const dados = await buscarDadosDoUsuario();
    console.log(dados);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

