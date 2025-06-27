const { pool } = require('../config/db');

/**
 * Cria um novo produto no banco de dados.
 * @param {object} productData - Dados do produto (name, quantity, price, category).
 * @returns {Promise<object>} O produto criado.
 */
async function createProduct(productData) {
    const { name, quantity, price, category } = productData;
    const [result] = await pool.execute(
        'INSERT INTO Products (name, quantity, price, category) VALUES (?, ?, ?, ?)',
        [name, quantity, price, category]
    );
    return { id: result.insertId, name, quantity, price, category };
}

/**
 * Busca um produto por ID.
 * @param {number} id - O ID do produto.
 * @returns {Promise<object|null>} O produto encontrado ou null.
 */
async function getProductById(id) {
    const [rows] = await pool.execute('SELECT * FROM Products WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Busca um produto por nome.
 * @param {string} name - O nome do produto.
 * @returns {Promise<object|null>} O produto encontrado ou null.
 */
async function getProductByName(name) {
    const [rows] = await pool.execute('SELECT * FROM Products WHERE name = ?', [name]);
    return rows[0] || null;
}

/**
 * Lista todos os produtos.
 * @returns {Promise<Array<object>>} Uma lista de produtos.
 */
async function getAllProducts() {
    const [rows] = await pool.execute('SELECT * FROM Products');
    return rows;
}

/**
 * Atualiza um produto existente.
 * @param {number} id - O ID do produto a ser atualizado.
 * @param {object} productData - Os dados para atualização (name, price, category).
 * @returns {Promise<boolean>} True se a atualização for bem-sucedida, false caso contrário.
 */
async function updateProduct(id, productData) {
    const { name, price, category } = productData;
    const [result] = await pool.execute(
        'UPDATE Products SET name = ?, price = ?, category = ? WHERE id = ?',
        [name, price, category, id]
    );
    return result.affectedRows > 0;
}

/**
 * Deleta um produto por ID.
 * @param {number} id - O ID do produto a ser deletado.
 * @returns {Promise<boolean>} True se a deleção for bem-sucedida, false caso contrário.
 */
async function deleteProduct(id) {
    const [result] = await pool.execute('DELETE FROM Products WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

/**
 * Atualiza a quantidade de um produto.
 * @param {number} productId - O ID do produto.
 * @param {number} newQuantity - A nova quantidade em estoque.
 * @returns {Promise<boolean>} True se a atualização for bem-sucedida, false caso contrário.
 */
async function updateProductQuantity(productId, newQuantity) {
    const [result] = await pool.execute(
        'UPDATE Products SET quantity = ? WHERE id = ?',
        [newQuantity, productId]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createProduct,
    getProductById,
    getProductByName,
    getAllProducts,
    updateProduct,
    deleteProduct,
    updateProductQuantity
};