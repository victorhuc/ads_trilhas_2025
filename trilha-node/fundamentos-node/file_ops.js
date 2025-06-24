const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'exemplo.txt');
const fileContent = 'Olá, este é um conteúdo de exemplo para o arquivo!';

// 1. Criar e escrever no arquivo (assíncrono)
fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    console.error('Erro ao escrever no arquivo:', err);
    return;
  }
  console.log('Arquivo "exemplo.txt" criado e escrito com sucesso.');

  // 2. Ler o conteúdo do arquivo (assíncrono)
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
    console.log('Conteúdo do arquivo "exemplo.txt":');
    console.log(data);
  });
});

