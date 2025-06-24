// db.js (novo arquivo)
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'seu_usuario_db',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'sua_base_de_dados',
    password: process.env.DB_PASSWORD || 'sua_senha_db',
    port: process.env.DB_PORT || 5432,
});

// Função para executar queries com prepared statements
async function query(text, params) {
    try {
        const res = await pool.query(text, params);
        return res.rows;
    } catch (error) {
        console.error('Erro na query:', error);
        throw error;
    }
}

module.exports = { query };