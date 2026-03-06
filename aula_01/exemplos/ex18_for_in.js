const aluno = {
  nome: "João",
  idade: 20
};

for (const chave in aluno) {
  console.log(chave, aluno[chave]);
}