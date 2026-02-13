/*
    Complete o código abaixo. Liste apenas nomes 
    que possuem o valor de search.

    Dica: pesquise e use users.filter()
    Documentação: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        return response.json();
    })
    .then(users => {
        const search = 'Ervin'
        // Seu código aqui
    })
    .catch(error => console.log(error));

