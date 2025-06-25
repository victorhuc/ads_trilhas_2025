const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.create({ name, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Senha inválida.' });

    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};
