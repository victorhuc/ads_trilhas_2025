const express = require('express');
const cors = require('cors');
// require('dotenv').config(); // Garante que as variáveis de ambiente estejam carregadas
const { testDbConnection } = require('./src/config/db'); // Importa a função de teste de conexão
const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor (3000 como padrão)

// Importação das Rotas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const reportRoutes = require('./src/routes/reportRoutes'); 

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Habilita o Express a parsear JSON do corpo das requisições

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reports', reportRoutes);

// Rota de saúde/verificação básica
app.get('/', (req, res) => {
    res.send('API de Controle de Estoque Online!');
});

// Teste inicial da conexão com o banco de dados (executa uma vez ao iniciar o app)
testDbConnection();

// Inicia o servidor SOMENTE se o arquivo for executado diretamente (não importado por um teste)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse: http://localhost:${PORT}`);
    });
}

// Exporta o aplicativo Express para ser usado em testes ou por outros módulos
module.exports = app;