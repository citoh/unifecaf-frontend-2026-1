/*
    Exercício 2:
    Crie uma variável chamada nota (0 a 10).
    Utilizando if, else if e operadores lógicos,
    informe se o aluno está:
    - Reprovado (nota < 5)
    - Recuperação (nota >= 5 e < 7)
    - Aprovado (nota >= 7)
*/

let nota = 6;

if (nota < 5) {
    console.log("Reprovado");
} else if (nota >= 5 && nota < 7) {
    console.log("Recuperação");
} else {
    console.log("Aprovado");
}