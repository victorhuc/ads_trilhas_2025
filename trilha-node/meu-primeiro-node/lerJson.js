// 7 - Crie um arquivo JSON com informações de um usuário e leia-o usando Node.js.


const fs = require('fs');

const nomeArquivoJson = 'usuario.json';

console.log(`Tentando ler o arquivo JSON: ${nomeArquivoJson}`);

fs.readFile(nomeArquivoJson, 'utf8', (err, data) => {
    if (err) {
        console.error(`Erro ao ler o arquivo JSON ${nomeArquivoJson}:`, err);
        return;
    }

    try {
        // Analisa a string JSON para um objeto JavaScript
        const usuario = JSON.parse(data);

        console.log('Informações do usuário:');
        console.log('Nome:', usuario.nome);
        console.log('Idade:', usuario.idade);
        console.log('Email:', usuario.email);
        console.log('Ativo:', usuario.ativo);
        console.log('Hobbies:', usuario.hobbies.join(', '));

    } catch (parseError) {
        console.error('Erro ao fazer parse do JSON:', parseError.message);
    }
});

console.log("Requisição de leitura de JSON enviada (assíncrona).");