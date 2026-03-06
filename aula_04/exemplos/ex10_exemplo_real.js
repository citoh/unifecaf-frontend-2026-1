async function carregarUsuarios() {
  try {
    const resposta = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usuarios = await resposta.json();
    console.log(usuarios);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

carregarUsuarios()