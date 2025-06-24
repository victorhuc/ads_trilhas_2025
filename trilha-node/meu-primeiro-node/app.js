// 1 - Crie um projeto Node.js e exiba a mensagem "Bem-vindo ao Node.js!"

// app.js
console.log("Bem-vindo ao Node.js!");

//2 - Escreva um código que exiba uma mensagem com um atraso de 3 segundos

// app.js (ou atraso.js)

console.log("Mensagem inicial. Aguarde 3 segundos...");

setTimeout(() => {
    console.log("Olá! Esta mensagem apareceu após 3 segundos.");
}, 3000); // 3000 milissegundos = 3 segundos

console.log("Isso é executado imediatamente, antes do atraso!");