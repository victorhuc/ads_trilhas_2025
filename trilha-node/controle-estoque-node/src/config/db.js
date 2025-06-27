// src/config/db.js
// require('dotenv').config(); // Manter por enquanto

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'stock_control_db',
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        // ADICIONE ESTES CONSOLE.LOGS AQUI:
        console.log('DEBUG DB: MYSQLHOST:', process.env.MYSQLHOST);
        console.log('DEBUG DB: MYSQLUSER:', process.env.MYSQLUSER);
        console.log('DEBUG DB: MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? '***** (presente)' : '***** (ausente)'); // Não logar a senha literal
        console.log('DEBUG DB: MYSQLDATABASE:', process.env.MYSQLDATABASE);
        console.log('DEBUG DB: MYSQLPORT:', process.env.MYSQLPORT);

        await pool.getConnection();
        console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MySQL:', error.message);
        throw new Error('Falha crítica na conexão com o banco de dados: ' + error.message);
    }
}

module.exports = { pool, testDbConnection };