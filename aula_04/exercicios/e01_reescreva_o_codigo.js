// Reescreva o código abaixo usando async/await e try/catch

/*

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        return response.json();
    })
    .then(users => {
        const search = 'Ervin'
        const resultado = users.filter(user => user.name.includes(search));
        console.log(resultado);
    })
    .catch(error => console.log(error));

*/