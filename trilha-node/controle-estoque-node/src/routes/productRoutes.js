const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Rotas de Produto

// Criar produto (apenas admin)
router.post('/', authenticateToken, authorizeRoles(['admin']), productController.createProduct);

// Listar todos os produtos (autenticado, admin ou user comum)
router.get('/', authenticateToken, productController.getAllProducts);

// Buscar produto por ID (autenticado)
router.get('/:id', authenticateToken, productController.getProductById);

// Atualizar produto (apenas admin)
router.put('/:id', authenticateToken, authorizeRoles(['admin']), productController.updateProduct);

// Deletar produto (apenas admin)
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), productController.deleteProduct);

// Registrar entrada de estoque (autenticado, admin ou user comum)
router.post('/:id/entry', authenticateToken, productController.productStockEntry);

// Registrar saída de estoque (autenticado, admin ou user comum)
router.post('/:id/exit', authenticateToken, productController.productStockExit);

module.exports = router;