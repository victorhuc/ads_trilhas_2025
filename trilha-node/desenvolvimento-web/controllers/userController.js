const pool = require('../config/db');

// 2. Implementa uma rota GET que lista todos os usuários de um banco MySQL.
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    // 9. Adiciona tratamento de erros para uma consulta SQL que pode falhar.
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

// 4. Cria uma rota POST que insira um novo usuário no banco de dados.
const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
  }
  try {
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.insertId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email já cadastrado.', error: error.message });
    }
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

// 5. Implementa uma rota PUT para atualizar o nome de um usuário pelo ID.
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({ message: 'Pelo menos um campo (nome ou email) deve ser fornecido para atualização.' });
  }

  let query = 'UPDATE users SET ';
  const params = [];
  const fields = [];

  if (name) {
    fields.push('name = ?');
    params.push(name);
  }
  if (email) {
    fields.push('email = ?');
    params.push(email);
  }

  query += fields.join(', ') + ' WHERE id = ?';
  params.push(id);

  try {
    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email já cadastrado para outro usuário.', error: error.message });
    }
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

// 6. Cria uma rota DELETE que exclua um usuário pelo ID.
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
};

// 7. Usa prepared statements para consultar um usuário pelo nome de forma segura.
const getUserByName = async (req, res) => {
  const { name } = req.query; // Usar query params para buscar por nome
  if (!name) {
    return res.status(400).json({ message: 'O parâmetro "name" é obrigatório.' });
  }
  try {
    // Prepared statement para segurança contra SQL Injection
    const [rows] = await pool.query('SELECT * FROM users WHERE name LIKE ?', [`%${name}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuário por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário por nome', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByName
};