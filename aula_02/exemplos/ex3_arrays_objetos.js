// Arrays + Objetos

const usuarios = [
  { nome: "Ana", idade: 20 },
  { nome: "Carlos", idade: 17 },
  { nome: "Maria", idade: 25 }
];

const maiores = usuarios.filter(u => u.idade >= 18);

console.log(maiores);