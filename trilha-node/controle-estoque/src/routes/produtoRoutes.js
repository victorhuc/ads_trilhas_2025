const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { verificarAuth, verificarAdmin } = require('../middleware/authMiddleware');

// Rota para criar um produto (protegido por autenticação e admin)
router.post('/produtos', verificarAuth, verificarAdmin, produtoController.criarProduto);

// Rota para listar todos os produtos (protegido apenas por autenticação)
router.get('/produtos', verificarAuth, produtoController.listarProdutos);

// Rota para buscar um produto por ID (protegido por autenticação)
router.get('/produtos/:id', verificarAuth, produtoController.buscarProdutoPorId);

// Rota para atualizar um produto (protegido por autenticação e admin)
router.put('/produtos/:id', verificarAuth, verificarAdmin, produtoController.atualizarProduto);

// Rota para excluir um produto (protegido por autenticação e admin)
router.delete('/produtos/:id', verificarAuth, verificarAdmin, produtoController.excluirProduto);

// Rota para registrar entrada de produto (protegido por autenticação)
router.post('/produtos/entrada', verificarAuth, produtoController.registrarEntrada);

// Rota para registrar saída de produto (protegido por autenticação)
router.post('/produtos/saida', verificarAuth, produtoController.registrarSaida);

// Rota para listar os produtos mais vendidos (protegido por autenticação)
router.get('/produtos/mais-vendidos', verificarAuth, produtoController.produtosMaisVendidos);

// Rota para relatório de estoque baixo (protegido por autenticação)
router.get('/produtos/estoque-baixo', verificarAuth, produtoController.estoqueBaixo);

module.exports = router;
