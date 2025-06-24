const fs = require('fs');
const path = require('path');

const nonExistentFilePath = path.join(__dirname, 'arquivo_inexistente.txt');

console.log(`Tentando ler o arquivo: ${nonExistentFilePath}`);

try {
  // Tenta ler o arquivo de forma síncrona.
  // Esta linha lançará um erro se o arquivo não existir.
  const data = fs.readFileSync(nonExistentFilePath, 'utf8');
  console.log('Conteúdo do arquivo:', data);
} catch (error) {
  // O bloco catch captura qualquer erro lançado no bloco try.
  if (error.code === 'ENOENT') {
    console.error('Erro: O arquivo não foi encontrado.', error.message);
  } else {
    console.error('Ocorreu um erro inesperado ao ler o arquivo:', error);
  }
}

console.log('Execução do script continua após o bloco try/catch.');

