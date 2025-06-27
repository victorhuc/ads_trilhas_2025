require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost', // Prioriza Railway, depois .env, depois localhost
    user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'controle_estoque_db',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306, // Prioriza Railway, depois .env, depois 3306

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        await pool.getConnection();
        console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MySQL:', error.message);
    }
}

module.exports = { pool, testDbConnection };