const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para criar um novo usuário
const criarUsuario = (nome, email, senha, role, callback) => {
    const hashSenha = bcrypt.hashSync(senha, 10); // Criptografando a senha
    const query = `INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)`;
    db.query(query, [nome, email, hashSenha, role], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para autenticar um usuário
const autenticarUsuario = (email, senha, callback) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return callback('Usuário não encontrado', null);
        }

        const usuario = results[0];
        // Comparando a senha fornecida com a criptografada
        bcrypt.compare(senha, usuario.senha, (err, res) => {
            if (err || !res) {
                return callback('Senha incorreta', null);
            }

            // Gerando o token JWT
            const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            callback(null, { token, usuario });
        });
    });
};

// Função para buscar um usuário por ID
const buscarUsuarioPorId = (id, callback) => {
    const query = 'SELECT id, nome, email, role FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]);
    });
};

module.exports = {
    criarUsuario,
    autenticarUsuario,
    buscarUsuarioPorId
};
