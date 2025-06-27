// src/models/reportModel.js
const { pool } = require('../config/db');

/**
 * Obtém os produtos mais vendidos (com mais saídas).
 * @param {number} limit - O número máximo de produtos a retornar.
 * @returns {Promise<Array<object>>} Uma lista dos produtos mais vendidos.
 */
async function getTopSellingProducts(limit = 10) {
    const [rows] = await pool.execute(
        `SELECT
            p.id,
            p.name,
            p.category,
            SUM(sm.quantity_moved) AS total_sold_quantity
        FROM
            Products p
        JOIN
            StockMovements sm ON p.id = sm.product_id
        WHERE
            sm.type = 'OUT'
        GROUP BY
            p.id, p.name, p.category
        ORDER BY
            total_sold_quantity DESC
        LIMIT ?`,
        [limit]
    );
    return rows;
}

/**
 * Obtém produtos com estoque abaixo de um determinado limite.
 * @param {number} threshold - O limite de quantidade para considerar estoque baixo.
 * @returns {Promise<Array<object>>} Uma lista de produtos com estoque baixo.
 */
async function getLowStockProducts(threshold = 10) {
    const [rows] = await pool.execute(
        `SELECT
            id,
            name,
            quantity,
            category
        FROM
            Products
        WHERE
            quantity <= ?
        ORDER BY
            quantity ASC`,
        [threshold]
    );
    return rows;
}

module.exports = {
    getTopSellingProducts,
    getLowStockProducts
};