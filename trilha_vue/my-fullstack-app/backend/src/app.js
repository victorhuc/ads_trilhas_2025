require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas primeiro
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Importa bcryptjs para comparar senhas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para gerar tokens

const { connectDB } = require('./config/database');
const User = require('./models/User');
const authMiddleware = require('./middleware/authMiddleware'); // Importa o middleware de autenticação

// Middlewares
app.use(cors()); // Permite requisições de outras origens (como o frontend Vue.js)
app.use(express.json()); // Habilita o Express a ler corpos de requisição JSON

// --- Rotas da API ---

// Rota raiz (Questão 1)
app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

// Rota para criar um novo usuário (Questão 4)
app.post('/usuarios', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos (nome, email, senha) são obrigatórios.' });
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'O e-mail fornecido já está em uso.' });
    }
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao criar usuário.' });
  }
});

// Rota para listar todos os usuários (Questão 5)
app.get('/usuarios', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar usuários.' });
  }
});

// Rota para atualizar os dados de um usuário específico (Questão 7)
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'O e-mail fornecido já está em uso por outro usuário.' });
    }
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
  }
});

// Rota de Login para autenticação do usuário (Questão 8)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor no login.' });
  }
});

// Exemplo de rota protegida (Questão 9)
// Esta rota só pode ser acessada se um token JWT válido for fornecido no cabeçalho.
app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Você acessou uma rota protegida com sucesso!',
    user: req.user, // Informações do usuário decodificadas do token
    data: 'Este é um dado sensível que só usuários logados podem ver.'
  });
});

// --- Início do Servidor ---

// Função para iniciar o servidor APÓS a conexão com o banco de dados (Questão 2)
async function startServer() {
  await connectDB(); // Tenta conectar ao DB e sincroniza os modelos
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
  });
}

startServer(); // Chama a função para iniciar o servidor

module.exports = app;