const { pool } = require('../config/db');
const { hashPassword } = require('../utils/authUtils');

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} userData - Dados do usuário (name, email, password, role).
 * @returns {Promise<object>} O usuário criado (sem a senha).
 */
async function createUser(userData) {
    const { name, email, password, role } = userData;
    const hashedPassword = await hashPassword(password); // Criptografa a senha

    const [result] = await pool.execute(
        'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
    );
    // Retorna o usuário sem a senha
    return { id: result.insertId, name, email, role };
}

/**
 * Busca um usuário por email.
 * @param {string} email - O email do usuário.
 * @returns {Promise<object|null>} O usuário encontrado ou null.
 */
async function getUserByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0] || null;
}

/**
 * Busca um usuário por ID.
 * @param {number} id - O ID do usuário.
 * @returns {Promise<object|null>} O usuário encontrado ou null.
 */
async function getUserById(id) {
    const [rows] = await pool.execute('SELECT id, name, email, role FROM Users WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Lista todos os usuários.
 * @returns {Promise<Array<object>>} Uma lista de usuários (sem senhas).
 */
async function getAllUsers() {
    const [rows] = await pool.execute('SELECT id, name, email, role FROM Users');
    return rows;
}

/**
 * Atualiza um usuário existente.
 * @param {number} id - O ID do usuário a ser atualizado.
 * @param {object} userData - Os dados para atualização (name, email, password, role).
 * @returns {Promise<boolean>} True se a atualização for bem-sucedida, false caso contrário.
 */
async function updateUser(id, userData) {
    const { name, email, password, role } = userData;
    let query = 'UPDATE Users SET name = ?, email = ?, role = ?';
    const params = [name, email, role];

    if (password) {
        const hashedPassword = await hashPassword(password);
        query += ', password = ?';
        params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
}

/**
 * Deleta um usuário por ID.
 * @param {number} id - O ID do usuário a ser deletado.
 * @returns {Promise<boolean>} True se a deleção for bem-sucedida, false caso contrário.
 */
async function deleteUser(id) {
    const [result] = await pool.execute('DELETE FROM Users WHERE id = ?', [id]);
    return result.affectedRows > 0;
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};