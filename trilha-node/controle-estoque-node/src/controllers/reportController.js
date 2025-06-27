// src/controllers/reportController.js
const reportModel = require('../models/reportModel'); // Confirme se o caminho está correto: '../models/reportModel'

/**
 * Gera o relatório de produtos mais vendidos.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getTopSellingProductsReport(req, res) {
    // Obtenha o 'limit' da query string e tente convertê-lo para inteiro.
    let limit = parseInt(req.query.limit);

    // Validação robusta: se 'limit' não for um número válido (NaN) ou for menor ou igual a zero,
    // defina-o para o valor padrão de 10.
    if (isNaN(limit) || limit <= 0) {
        limit = 10;
    }

    try {
        // Neste ponto, 'limit' DEVE ser um número inteiro positivo.
        const products = await reportModel.getTopSellingProducts(limit);
        res.json(products);
    } catch (error) {
        console.error('Erro ao gerar relatório de produtos mais vendidos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Gera o relatório de produtos com estoque baixo.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getLowStockProductsReport(req, res) {
    // Obtenha o 'threshold' da query string e tente convertê-lo para inteiro.
    let threshold = parseInt(req.query.threshold);

    // Validação robusta: se 'threshold' não for um número válido (NaN) ou for negativo,
    // defina-o para o valor padrão de 10.
    if (isNaN(threshold) || threshold < 0) {
        threshold = 10;
    }

    try {
        // Neste ponto, 'threshold' DEVE ser um número inteiro não negativo.
        const products = await reportModel.getLowStockProducts(threshold);
        res.json(products);
    } catch (error) {
        console.error('Erro ao gerar relatório de estoque baixo:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    getTopSellingProductsReport,
    getLowStockProductsReport
};