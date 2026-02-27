/**
 * Object.create
 *
 * O que faz:
 * Object.create(proto) cria um novo objeto com o protótipo informado.
 *
 * Exemplo:
 * criar objeto herdando de um proto com método
 *
 * Impressão do resultado (saída esperada):
 * Saudação: Olá, Ana
 */

const proto = {
  saudacao(nome) {
    return `Olá, ${nome}`;
  }
};

const obj = Object.create(proto);
console.log('Saudação:', obj.saudacao('Ana'));
