require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
