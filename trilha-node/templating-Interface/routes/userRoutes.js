const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para exibir o formulário de cadastro de usuário
router.get('/add', userController.showUserForm);

// Rota para cadastrar um novo usuário (POST)
router.post('/add', userController.createUser);

// Rota para listar todos os usuários
router.get('/', userController.listUsers);

module.exports = router;