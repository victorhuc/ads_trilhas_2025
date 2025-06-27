const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Rotas de Usuário (requerem autenticação e, em alguns casos, role de 'admin')

// Criar usuário (apenas admin pode criar outros usuários)
// router.post('/', authenticateToken, authorizeRoles(['admin']), userController.createUser);

router.post('/', userController.createUser);

// Listar todos os usuários (apenas admin)
router.get('/', authenticateToken, authorizeRoles(['admin']), userController.getAllUsers);

// Buscar usuário por ID (apenas admin)
router.get('/:id', authenticateToken, authorizeRoles(['admin']), userController.getUserById);

// Atualizar usuário (apenas admin)
router.put('/:id', authenticateToken, authorizeRoles(['admin']), userController.updateUser);

// Deletar usuário (apenas admin)
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), userController.deleteUser);

module.exports = router;