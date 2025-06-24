// index.js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const { conectar } = require('./db');
conectar();

const Usuario = require('./models/Usuario');


Usuario.sync({ force: false })
  .then(() => {
    console.log('Tabela de usuários pronta!');
  })
  .catch((err) => {
    console.error('Erro ao criar a tabela de usuários:', err);
  });

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: error.message });
  }
});

// Rota para atualizar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;
    usuario.senha = senha ?? usuario.senha;

    await usuario.save();

    res.json({ mensagem: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SEGREDO_JWT = 'secreto123'; // 🔐 Use um valor mais seguro em produção

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO_JWT, {
      expiresIn: '1h',
    });

    res.json({ mensagem: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhes: error.message });
  }
});

const autenticarToken = require('./auth');

// Rota protegida com token
app.get('/protegido', autenticarToken, (req, res) => {
  res.json({ mensagem: `Olá, ${req.usuario.email}! Você acessou uma rota protegida.` });
});
