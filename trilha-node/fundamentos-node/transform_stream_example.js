const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output_uppercase.txt');

// 1. Crie um arquivo de entrada para testar o stream
const initialContent = 'Este é um texto de exemplo para o stream.\nSerá convertido para maiúsculas.';
fs.writeFileSync(inputFile, initialContent, 'utf8');
console.log(`Arquivo de entrada "${inputFile}" criado.`);

// 2. Crie um Transform stream personalizado
// Este stream vai converter todos os chunks para maiúsculas
const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Converte o chunk (Buffer) para string, transforma para maiúsculas e o envia.
    this.push(chunk.toString().toUpperCase());
    callback(); // Indica que a transformação está completa para este chunk
  }
});

console.log(`Iniciando a transformação de "${inputFile}" para "${outputFile}"...`);

// 3. Encadeie os streams: Leitura -> Transformação -> Escrita
fs.createReadStream(inputFile) // Stream de Leitura
  .pipe(uppercaseTransform)   // Stream de Transformação (Duplex)
  .pipe(fs.createWriteStream(outputFile)) // Stream de Escrita
  .on('finish', () => {
    console.log('Transformação concluída. Verifique "output_uppercase.txt".');
    // Opcional: Leia o arquivo de saída para verificar o resultado
    fs.readFile(outputFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo de saída:', err);
        return;
      }
      console.log('\nConteúdo do arquivo de saída ("output_uppercase.txt"):');
      console.log(data);
    });
  })
  .on('error', (err) => {
    console.error('Ocorreu um erro na pipeline do stream:', err);
  });

