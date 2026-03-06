/**
 * Array.prototype.find
 *
 * O que faz:
 * Retorna o primeiro elemento que satisfaz a condição. Se não encontrar, retorna undefined.
 *
 * Exemplo:
 * achar o primeiro usuário com role 'admin'
 *
 * Impressão do resultado (saída esperada):
 * { id: 2, nome: 'Bia', role: 'admin' }
 */

const usuarios = [
  { id: 1, nome: 'Ana', role: 'user' },
  { id: 2, nome: 'Bia', role: 'admin' },
  { id: 3, nome: 'Caio', role: 'admin' }
];

const admin = usuarios.find((u) => u.role === 'admin');
console.log(admin);
