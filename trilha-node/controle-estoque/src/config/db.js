const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,     
    user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME  
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
        process.exit(1); // Finaliza o processo se houver erro de conexão
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = db;
