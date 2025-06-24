const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const PORT = 3000;

app.use(cors()); // Habilita o CORS para todas as requisições
app.use(express.json()); // Permite que o Express lide com JSON no corpo das requisições

// Base de dados de usuários fictícia
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3; // Próximo ID disponível para novos usuários

// GET /usuarios: Retorna uma lista de usuários
app.get('/usuarios', (req, res) => {
  res.json(users);
});

// POST /usuarios: Adiciona um novo usuário
app.post('/usuarios', (req, res) => {
  const newUser = {
    id: nextId++,
    name: req.body.name,
    email: req.body.email
  };
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
  }
  users.push(newUser);
  res.status(201).json(newUser); // 201 Created
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// DELETE /usuarios/:id: Remove um usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id); // Converte o ID para número
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);

  if (users.length < initialLength) {
    res.status(204).send(); // 204 No Content - sucesso na remoção
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' }); // 404 Not Found
  }
});