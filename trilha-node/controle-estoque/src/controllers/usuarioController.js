// src/controllers/usuarioController.js

const Usuario = require('../models/usuarioModel');

// Registrar um novo usuário
const criarUsuario = (req, res) => {
    const { nome, email, senha, role } = req.body;

    Usuario.criarUsuario(nome, email, senha, role, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!', data: result });
    });
};

// Autenticar um usuário
const autenticarUsuario = (req, res) => {
    const { email, senha } = req.body;

    Usuario.autenticarUsuario(email, senha, (err, result) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        res.status(200).json({
            message: 'Autenticação bem-sucedida!',
            token: result.token,
            usuario: result.usuario
        });
    });
};

// Buscar usuário por ID
const buscarUsuarioPorId = (req, res) => {
    const { id } = req.params;
    Usuario.buscarUsuarioPorId(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result);
    });
};

module.exports = {
    criarUsuario,
    autenticarUsuario,
    buscarUsuarioPorId
};
