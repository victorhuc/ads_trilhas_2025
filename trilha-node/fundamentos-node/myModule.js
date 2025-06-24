function greet(name) {
  return `Olá, ${name}! Bem-vindo ao mundo CommonJS.`;
}

// Exporta a função `greet` para ser utilizada em outros arquivos.
module.exports = greet;

// app.js
/**
 * Este arquivo importa e utiliza a função exportada do módulo CommonJS.
 */
// Importa o módulo 'myModule.js' usando `require()`
const greetFunction = require('./myModule');

const userName = 'Desenvolvedor Node.js';
const message = greetFunction(userName);

console.log(message); // Saída: Olá, Desenvolvedor Node.js! Bem-vindo ao mundo CommonJS.

