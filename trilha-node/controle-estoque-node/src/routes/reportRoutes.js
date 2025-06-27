// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Rotas de Relatórios

// Relatório de produtos mais vendidos (apenas admin)
router.get('/top-selling', authenticateToken, authorizeRoles(['admin']), reportController.getTopSellingProductsReport);

// Relatório de produtos com estoque baixo (apenas admin)
router.get('/low-stock', authenticateToken, authorizeRoles(['admin']), reportController.getLowStockProductsReport);

module.exports = router;