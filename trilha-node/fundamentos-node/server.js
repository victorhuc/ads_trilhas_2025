const http = require('http');

const hostname = '127.0.0.1'; // Endereço IP local
const port = 3000; // Porta do servidor

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Define o código de status HTTP para 200 (OK)
  res.statusCode = 200;
  // Define o cabeçalho Content-Type para texto plano
  res.setHeader('Content-Type', 'text/plain');
  // Envia a resposta para o cliente
  res.end('Bem-vindo ao Node.js!\n');
});

// Faz o servidor escutar em uma porta e hostname específicos
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
  console.log('Abra seu navegador e acesse esta URL.');
});

