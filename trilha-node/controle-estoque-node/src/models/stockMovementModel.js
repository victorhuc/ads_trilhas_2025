const { pool } = require('../config/db');

/**
 * Registra uma movimentação de estoque.
 * @param {object} movementData - Dados da movimentação (product_id, user_id, type, quantity_moved).
 * @returns {Promise<object>} A movimentação registrada.
 */
async function createStockMovement(movementData) {
    const { product_id, user_id, type, quantity_moved } = movementData;
    const [result] = await pool.execute(
        'INSERT INTO StockMovements (product_id, user_id, type, quantity_moved) VALUES (?, ?, ?, ?)',
        [product_id, user_id, type, quantity_moved]
    );
    return { id: result.insertId, product_id, user_id, type, quantity_moved, created_at: new Date() };
}

/**
 * Obtém as movimentações de estoque para um produto específico em um período.
 * @param {number} productId - ID do produto.
 * @param {string} startDate - Data de início (YYYY-MM-DD).
 * @param {string} endDate - Data de fim (YYYY-MM-DD).
 * @returns {Promise<Array<object>>} Lista de movimentações.
 */
async function getProductMovements(productId, startDate, endDate) {
    const [rows] = await pool.execute(
        `SELECT * FROM StockMovements
         WHERE product_id = ? AND created_at BETWEEN ? AND ?
         ORDER BY created_at DESC`,
        [productId, startDate + ' 00:00:00', endDate + ' 23:59:59']
    );
    return rows;
}

module.exports = {
    createStockMovement,
    getProductMovements
};