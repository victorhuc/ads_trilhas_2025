const http = require('http');
const url = require('url'); // Módulo para parsear URLs

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Analisa a URL da requisição
  const parsedUrl = url.parse(req.url, true); // `true` para parsear a query string
  const path = parsedUrl.pathname; // O caminho da URL (ex: '/', '/about')

  res.statusCode = 200; // Define o status padrão para OK
  res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // Define o tipo de conteúdo e codificação

  // Lógica de roteamento baseada no caminho da URL
  if (path === '/') {
    res.end('Bem-vindo à página inicial!\n');
  } else if (path === '/about') {
    res.end('Esta é a página "Sobre nós".\n');
  } else if (path === '/contact') {
    res.end('Entre em contato conosco: contato@exemplo.com\n');
  } else if (path === '/api/data') {
    // Exemplo de rota de API que retorna JSON
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const data = {
      message: 'Dados da API!',
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(data));
  }
  else {
    res.statusCode = 404; // Não encontrado
    res.end('Página não encontrada.\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor de rotas rodando em http://${hostname}:${port}/`);
  console.log('Experimente acessar:');
  console.log(`- http://${hostname}:${port}/`);
  console.log(`- http://${hostname}:${port}/about`);
  console.log(`- http://${hostname}:${port}/contact`);
  console.log(`- http://${hostname}:${port}/api/data`);
  console.log(`- http://${hostname}:${port}/qualquer-outra-rota`);
});

