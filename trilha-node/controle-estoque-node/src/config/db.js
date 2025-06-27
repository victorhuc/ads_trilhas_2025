const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para testar a conexão com o banco de dados
async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);

    }
}

module.exports = {
    pool,
    testDbConnection
};