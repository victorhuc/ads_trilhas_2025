require('dotenv').config(); // Carrega variáveis de ambiente do .env
const express = require('express');
const http = require('http'); // Necessário para integrar Socket.IO com Express
const { Server } = require('socket.io'); // Importa Server do socket.io
const { Worker } = require('worker_threads'); // Para Worker Threads
const path = require('path'); // Para servir arquivos estáticos

const logger = require('./logger'); // Logger Winston
const { fetchDataFromApi } = require('./apiService'); // Função para buscar dados de API
const { executeSystemCommand } = require('./childProcessExample'); // Função para processo filho

const app = express();
const server = http.createServer(app); // Cria um servidor HTTP para o Express e Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Permite conexão de qualquer origem para o chat (ajuste para produção)
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos (como o index.html do chat)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para parsing de JSON no corpo das requisições

// --- Rotas API ---

// 1. Rota para buscar dados de uma API externa usando async/await
app.get('/api/data', async (req, res) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Exemplo de API pública
    logger.info(`Requisição recebida para /api/data. Tentando buscar de: ${apiUrl}`);
    try {
        const data = await fetchDataFromApi(apiUrl);
        logger.info('Dados da API externa buscados com sucesso.');
        res.json(data);
    } catch (error) {
        logger.error(`Erro ao buscar dados da API em /api/data: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// 2. Rota para iniciar uma tarefa em um Worker Thread (e 10. combinando com logging)
app.post('/run-worker-task', (req, res) => {
    const taskData = req.body.data || { message: 'Tarefa padrão' };
    logger.info(`Requisição para iniciar Worker Thread recebida com dados: ${JSON.stringify(taskData)}`);

    const worker = new Worker('./worker.js'); // Cria um novo Worker Thread
    worker.postMessage(taskData); // Envia dados para o worker

    worker.on('message', (result) => {
        if (result.status === 'completed') {
            logger.info(`Thread principal: Worker concluiu tarefa para ${JSON.stringify(result.data)} com resultado: ${result.result}`);
            res.json({ message: 'Tarefa enviada ao Worker Thread.', result: result.result });
        } else if (result.status === 'error') {
            logger.error(`Thread principal: Worker reportou um erro: ${result.message}`);
            res.status(500).json({ message: 'Erro na tarefa do Worker Thread.', error: result.message });
        }
    });

    worker.on('error', (err) => {
        logger.error(`Thread principal: Erro no Worker Thread: ${err.message}`);
        res.status(500).json({ message: 'Erro inesperado no Worker Thread.' });
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            logger.error(`Thread principal: Worker Thread parou com código de saída ${code}`);
        } else {
            logger.info('Thread principal: Worker Thread encerrado com sucesso.');
        }
    });
});

// 5. Rota para executar um comando do sistema operacional via processo filho
app.post('/execute-command', async (req, res) => {
    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ message: 'O campo "command" é obrigatório.' });
    }

    // CUIDADO: Executar comandos arbitrários do sistema é um risco de segurança.
    // Em uma aplicação real, você validaria/sanitizaria rigorosamente o comando
    // ou usaria um conjunto predefinido de comandos seguros.
    if (command.includes('rm ') || command.includes('format ')) {
        logger.warn(`Tentativa de executar comando perigoso: ${command}`);
        return res.status(403).json({ message: 'Comando proibido por segurança.' });
    }

    try {
        const output = await executeSystemCommand(command);
        res.json({ message: 'Comando executado com sucesso.', output });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao executar comando.', error: error.message });
    }
});


// --- Configuração do Socket.IO (3. Servidor Socket.io e 9. Chat em tempo real) ---
const activeUsers = new Set(); // Para rastrear usuários conectados (exemplo simples)

io.on('connection', (socket) => {
    logger.info(`Usuário conectado ao Socket.IO: ${socket.id}`);

    // Um "mock" de nome de usuário para o exemplo do chat
    const username = `User-${Math.floor(Math.random() * 1000)}`;
    activeUsers.add(username);
    io.emit('user connected', username); // Avisa a todos que um novo usuário conectou

    socket.on('chat message', (msg) => {
        logger.info(`Mensagem recebida de ${msg.username} (${socket.id}): ${msg.message}`);
        io.emit('chat message', msg); // Envia a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => {
        logger.info(`Usuário desconectado do Socket.IO: ${socket.id}`);
        activeUsers.delete(username);
        io.emit('user disconnected', username); // Avisa a todos que um usuário desconectou
    });

    // Registra logs de erros de Socket.IO
    socket.on('error', (err) => {
        logger.error(`Erro no Socket.IO para ${socket.id}: ${err.message}`);
    });
});

// Rota padrão para servir o cliente do chat
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor HTTP
server.listen(PORT, () => {
    logger.info(`Servidor Express e Socket.IO rodando na porta ${PORT}`);
    logger.info(`Acesse http://localhost:${PORT}/chat para o chat em tempo real.`);
    logger.info(`Teste a rota API: http://localhost:${PORT}/api/data`);
    logger.info(`Teste o Worker Thread (POST): http://localhost:${PORT}/run-worker-task com body {"data": "qualquer_dado"}`);
    logger.info(`Teste o Processo Filho (POST): http://localhost:${PORT}/execute-command com body {"command": "ls -la"}`);
});

// Captura exceções não tratadas no thread principal
process.on('uncaughtException', (error) => {
    logger.error(`Erro fatal não capturado no thread principal: ${error.message}`, error);
    process.exit(1); // Encerra o processo para evitar estados inconsistentes
});

// Captura rejections de Promises não tratadas
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Rejeição de Promise não tratada: ${reason}`, promise);
    // Não encerra o processo por padrão para rejections, mas loga.
    // Em alguns casos, pode-se decidir encerrar.
});