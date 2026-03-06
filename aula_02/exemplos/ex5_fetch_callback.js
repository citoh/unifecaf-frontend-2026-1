
function buscarUsuarios(callback) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
}

buscarUsuarios((erro, usuarios) => {
  if (erro) {
    console.error("Erro:", erro);
    return;
  }

  usuarios.forEach(user => {
    console.log(user.name);
  });
});