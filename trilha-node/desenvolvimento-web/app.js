const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// 3. Adiciona um middleware que registre o método HTTP e a URL de cada requisição.
app.use(requestLogger);

// 1. Cria um servidor Express.js que responda à rota / com "Hello, World!".
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 10. Estrutura um CRUD completo com separação de módulos em arquivos diferentes.
// Rotas de usuários
app.use('/users', userRoutes);

// Tratamento de rotas não encontradas
app.use((req, res, next) => {
  res.status(404).send("Desculpe, a rota que você está procurando não existe.");
});

// Tratamento de erros globais (opcional, mas recomendado para erros não capturados)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado no servidor!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});