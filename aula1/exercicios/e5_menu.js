/*
    Exercício 5:
    Utilize Math.random() para gerar números aleatórios entre 1 e 10.
    Use um laço do...while para continuar gerando números
    até encontrar um número que seja divisível por 2 e por 3 ao mesmo tempo.

    Exiba cada número gerado no console.
    Quando encontrar o número válido, exiba:
    "Número encontrado: X"

    Também exiba no final o número de tentativas.
*/

let numero;
let tentativas = 0;

do {
    numero = Math.floor(Math.random() * 10) + 1;
    // Seu código aqui
} while (/* Escreva aqui a condição de parada*/);

console.log("Número encontrado:", numero);
console.log("Número de tentativas:", tentativas);