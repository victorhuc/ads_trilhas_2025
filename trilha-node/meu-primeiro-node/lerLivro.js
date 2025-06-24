// 5 - Crie um script que leia um arquivo texto.txt e exiba o conteúdo no console.

const fs = require('fs'); // Módulo nativo do Node.js para sistema de arquivos

const nomeArquivo = 'texto.txt';

console.log(`Tentando ler o arquivo: ${nomeArquivo}`);

fs.readFile(nomeArquivo, 'utf8', (err, data) => {
    if (err) {
        console.error(`Erro ao ler o arquivo ${nomeArquivo}:`, err);
        return;
    }
    console.log(`Conteúdo de "${nomeArquivo}":`);
    console.log(data);
});

console.log("Requisição de leitura enviada (assíncrona).");