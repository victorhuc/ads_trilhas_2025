const bcrypt = require('bcryptjs');

const HASH_SALT_ROUNDS = 10; // Número de rounds para o hashing da senha

/**
 * Criptografa uma senha.
 * @param {string} password - A senha em texto puro.
 * @returns {Promise<string>} A senha criptografada.
 */
async function hashPassword(password) {
    return await bcrypt.hash(password, HASH_SALT_ROUNDS);
}

/**
 * Compara uma senha em texto puro com uma senha criptografada.
 * @param {string} password - A senha em texto puro fornecida pelo usuário.
 * @param {string} hashedPassword - A senha criptografada armazenada no banco de dados.
 * @returns {Promise<boolean>} True se as senhas coincidirem, false caso contrário.
 */
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};