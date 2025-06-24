const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 2. Rota GET para listar todos os usuários
router.get('/', userController.getAllUsers);

// 4. Rota POST para criar um novo usuário
router.post('/', userController.createUser);

// 5. Rota PUT para atualizar um usuário pelo ID
router.put('/:id', userController.updateUser);

// 6. Rota DELETE para excluir um usuário pelo ID
router.delete('/:id', userController.deleteUser);

// 7. Rota GET para consultar usuário por nome (usando prepared statements)
router.get('/search', userController.getUserByName);

module.exports = router;