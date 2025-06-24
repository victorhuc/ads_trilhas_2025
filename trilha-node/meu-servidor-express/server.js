// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Para hashing de senhas
const db = require('./db'); // Importa o módulo de banco de dados que você criou (db.js)

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_muito_segura'; // Use uma chave forte em produção

// --- 1. Configurar o Express e Middlewares Essenciais ---
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// --- 6. Configurar cookies seguros com os atributos HttpOnly e Secure ---
// --- 2. Implementar um sistema de sessão que armazene informações temporárias de um usuário ---
app.use(cookieParser()); // Necessário para express-session e para ler cookies

app.use(session({
    secret: process.env.SESSION_SECRET || 'sua_chave_secreta_de_sessao_muito_segura', // Chave secreta para assinar o cookie de sessão
    resave: false, // Não salva a sessão se não houver modificações
    saveUninitialized: true, // Salva sessões não inicializadas
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true em produção para HTTPS
        httpOnly: true, // Impede acesso via JavaScript do lado do cliente
        maxAge: 1000 * 60 * 60 * 24 // 1 dia em milissegundos
    }
}));

// --- 3. Configurar o CORS para permitir apenas requisições de um domínio específico ---
const allowedOrigins = ['http://localhost:8080', 'https://seu-dominio-frontend.com']; // SEU DOMÍNIO FRONTEND AQUI

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Importante para permitir cookies em requisições cross-origin
    optionsSuccessStatus: 204 // Para requisições OPTIONS
}));

// --- 4. Crie uma rota protegida que utilize tokens CSRF para validação ---
// Middleware CSRF. Deve vir DEPOIS de cookie-parser e express-session
app.use(csurf({ cookie: true })); // Armazena o token CSRF em um cookie

// Middleware para lidar com erros CSRF
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({ message: 'Token CSRF inválido ou ausente.' });
    } else {
        next(err);
    }
});

// --- Middleware para validar tokens JWT (pode ser usado no cabeçalho Authorization ou em cookie) ---
// Usaremos este para as rotas protegidas que dependem de JWT
const authenticateToken = (req, res, next) => {
    // Tenta obter o token do cabeçalho de autorização (Bearer Token)
    let token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Se não encontrou no cabeçalho, tenta obter do cookie
    if (!token && req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.sendStatus(401); // Não autorizado: Token não fornecido
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Erro na verificação do token JWT:', err);
            return res.sendStatus(403); // Token inválido ou expirado
        }
        req.user = user; // Anexa os dados do usuário (id, username, role) ao objeto req
        next();
    });
};

// --- 8. Implementar middleware para restringir acesso com base em roles ---
const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Acesso negado: Usuário não autenticado ou sem role.' });
        }

        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso negado: Você não tem a role necessária.' });
        }
        next();
    };
};

// --- ROTAS DO SERVIDOR ---

// --- 10. Crie um sistema de login simples que emita um JWT e proteja rotas baseadas no token. ---
// --- 7. (Parte 2) Inserir dados fictícios e criar usuário com roles (parte lógica) ---
// Rota de registro de usuário
app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: username, email, password.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
        // --- 5. Desenvolva uma função que previna SQL Injection utilizando prepared statements ---
        const newUser = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, hashedPassword, role || 'user'] // Define 'user' como role padrão
        );
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser[0] });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        if (error.code === '23505') { // Código de erro para violação de unique constraint (username ou email já existem)
            return res.status(409).json({ message: 'Nome de usuário ou e-mail já em uso.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
    }
});

// --- 1. Configurar um servidor Express para gerar e validar tokens JWT. ---
// --- 10. (Continuação) Sistema de login que emite JWT ---
// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // --- 5. Desenvolva uma função que previna SQL Injection utilizando prepared statements ---
        const users = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compara a senha fornecida com o hash

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Se a senha for válida, crie o token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Payload do token
            JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // Opção para enviar o token em um cookie HttpOnly e Secure
        res.cookie('jwt', token, {
            httpOnly: true, // Apenas HTTP, não acessível via JavaScript do cliente
            secure: process.env.NODE_ENV === 'production', // true em produção (requer HTTPS)
            sameSite: 'Lax', // Proteção CSRF, evita que o cookie seja enviado em requisições cross-site automaticamente
            maxAge: 1000 * 60 * 60 // 1 hora
        });
        res.json({ message: 'Login bem-sucedido!', user: { id: user.id, username: user.username, role: user.role } });
        // Você pode optar por retornar o token no JSON também, dependendo da sua estratégia de frontend.
        // res.json({ token, user: { id: user.id, username: user.username, role: user.role } });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota de logout (para limpar o cookie JWT)
app.post('/logout', (req, res) => {
    res.clearCookie('jwt'); // Remove o cookie JWT
    res.json({ message: 'Logout bem-sucedido.' });
});

// --- 1. (Continuação) Exemplo de rota protegida por JWT ---
// --- 10. (Continuação) Proteger rotas baseadas no token ---
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo ao seu painel, ${req.user.username}! Sua role é: ${req.user.role}` });
});

// --- 8. (Continuação) Middleware para restringir acesso com base em roles ---
app.get('/admin-panel', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    res.json({ message: `Acesso permitido ao painel de administração, ${req.user.username}!` });
});

app.get('/editor-content', authenticateToken, authorizeRoles(['admin', 'editor']), (req, res) => {
    res.json({ message: `Conteúdo para editores ou administradores, ${req.user.username}!` });
});

// --- 2. (Continuação) Exemplo de uso da sessão ---
app.get('/set-session', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    req.session.user = { id: 1, name: 'John Doe', role: 'guest' };
    res.send(`Sessão configurada. Você visitou esta página ${req.session.views} vezes.`);
});

app.get('/get-session', (req, res) => {
    if (req.session.user) {
        res.json({ message: `Olá, ${req.session.user.name}! Visitas: ${req.session.views}` });
    } else {
        res.send('Nenhuma sessão encontrada.');
    }
});

// --- 4. (Continuação) Rota para obter o token CSRF ---
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// --- 4. (Continuação) Exemplo de rota protegida por CSRF ---
// --- 9. Simule um ataque CSRF e implemente a solução para preveni-lo (solução implementada pelo csurf) ---
app.post('/submit-data', (req, res) => {
    // Se você chegou aqui, o token CSRF foi validado com sucesso pelo middleware csurf
    res.json({ message: 'Dados enviados com sucesso! CSRF validado.' });
});

// --- 5. (Continuação) Exemplo de uso de prepared statements (já embutido no register e login) ---
// Exemplo de busca de usuário por ID
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await db.query('SELECT id, username, email, role FROM users WHERE id = $1', [userId]);
        if (users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});