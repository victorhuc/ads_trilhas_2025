// src/routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para criar um novo usuário
router.post('/usuarios', usuarioController.criarUsuario);

// Rota para autenticar um usuário (login)
router.post('/login', usuarioController.autenticarUsuario);

// Rota para buscar um usuário por ID
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);

module.exports = router;
