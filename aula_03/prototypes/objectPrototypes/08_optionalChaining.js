/**
 * Object - optional chaining
 *
 * O que faz:
 * Acessa propriedades/índices/chamadas com segurança. Se algo for null/undefined, retorna undefined sem lançar erro.
 *
 * Exemplo:
 * ler cidade com segurança
 *
 * Impressão do resultado (saída esperada):
 * cidade: undefined
 */

const user = { id: 1, perfil: null };
const cidade = user.perfil?.endereco?.cidade;
console.log('cidade:', cidade);
