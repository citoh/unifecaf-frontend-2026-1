async function buscarDadosDoUsuario(emailUsuario) {
  const usuarios = [
    { nome: "Ana", idade: 25, email: "ana@email.com" },
    { nome: "Pedro", idade: 30, email: "pedro@email.com" },
    { nome: "Maria", idade: 28, email: "maria@email.com" }
  ];
  const usuario = usuarios.find(u => u.email === emailUsuario);

  if (usuario) {
    return usuario;
  } else {
    throw new Error("Usuário não encontrado");
  }

}

async function carregarUsuarios() {

  const promessas = [
    buscarDadosDoUsuario("ana@email.com"),
    buscarDadosDoUsuario("pedro@email.com"),
    buscarDadosDoUsuario("maria@email.com")
  ];

  const resultados = await Promise.all(promessas);

  console.log("Todos os usuários carregados:");
  console.log(resultados);

}

carregarUsuarios();