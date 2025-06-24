const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController'); // Para o menu dinâmico

const app = express();
const port = process.env.PORT || 3000;

// 1. Configure o EJS em um projeto Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear o corpo da requisição (formulários e JSON)
app.use(express.urlencoded({ extended: true })); // Para dados de formulário
app.use(express.json()); // Para requisições JSON

// Middleware para integrar dados do MySQL no menu dinâmico para todas as rotas que usam o layout
app.use(async (req, res, next) => {
    try {
        res.locals.dynamicMenuUsers = await userController.getDynamicMenuData();
    } catch (error) {
        console.error('Erro ao carregar dados para o menu:', error);
        res.locals.dynamicMenuUsers = [];
    }
    next();
});

// Define o layout padrão para todas as renderizações EJS
app.use((req, res, next) => {
    res.renderWithLayout = (template, data) => {
        data = data || {};
        data.body = template; // O template específico será o 'body' dentro do layout
        res.render('layouts/main', data);
    };
    next();
});

// Rotas principais
app.get('/', (req, res) => {
    // 1. Crie um template básico. (index.ejs é o formulário, mas podemos ter uma home simples)
    res.renderWithLayout('index', { pageTitle: 'Página Inicial' });
});

// Rotas de usuários
app.use('/users', userRoutes);

// Tratamento de rotas não encontradas
app.use((req, res, next) => {
    res.status(404).renderWithLayout('error', {
        pageTitle: 'Página Não Encontrada',
        message: 'Desculpe, a página que você está procurando não existe.',
        details: 'Verifique a URL e tente novamente.'
    });
});

// Tratamento de erros globais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).renderWithLayout('error', {
        pageTitle: 'Erro Interno do Servidor',
        message: 'Algo deu muito errado no servidor!',
        details: err.message
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});