const fs = require('fs');
const path = require('path');

const largeFilePath = path.join(__dirname, 'large_file.txt');
const copyFilePath = path.join(__dirname, 'large_file_copy.txt');
const numLines = 100000; // Número de linhas para simular um arquivo grande

// Função para criar um arquivo grande de exemplo
function createLargeFile(callback) {
  const writeStream = fs.createWriteStream(largeFilePath);
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      const data = `Esta é a linha ${i} de ${numLines}.\n`;
      if (i === numLines) {
        // Última escrita
        writeStream.end(data);
        console.log('Arquivo grande de exemplo criado.');
        callback();
      } else {
        // Verifique se o buffer está cheio. Se não, continue escrevendo.
        ok = writeStream.write(data);
      }
    } while (i < numLines && ok);
    if (i < numLines) {
      // O buffer está cheio, então pause a escrita até que o evento 'drain' seja emitido.
      writeStream.once('drain', write);
    }
  }
  write();
}

// Cria o arquivo grande e, em seguida, processa-o com streams
createLargeFile(() => {
  console.log('Iniciando o processamento do arquivo com streams...');

  // Cria um stream de leitura do arquivo grande
  const readStream = fs.createReadStream(largeFilePath);
  // Cria um stream de escrita para copiar o arquivo
  const writeStream = fs.createWriteStream(copyFilePath);

  // Usa o método pipe() para encaminhar dados do readStream para o writeStream
  readStream.pipe(writeStream);

  // Evento 'end' é disparado quando o readStream termina de ler o arquivo
  readStream.on('end', () => {
    console.log('Leitura do arquivo grande concluída.');
  });

  // Evento 'finish' é disparado quando o writeStream termina de escrever
  writeStream.on('finish', () => {
    console.log('Cópia do arquivo grande concluída via stream. Verifique large_file_copy.txt');
  });

  // Tratamento de erros para ambos os streams
  readStream.on('error', (err) => {
    console.error('Erro no stream de leitura:', err);
  });

  writeStream.on('error', (err) => {
    console.error('Erro no stream de escrita:', err);
  });
});

