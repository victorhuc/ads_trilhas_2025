const cluster = require('cluster');
const os = require('os'); // Módulo para obter o número de CPUs
const logger = require('./logger'); // O mesmo logger configurado

const numCPUs = os.cpus().length; // Obtém o número de núcleos do processador

if (cluster.isMaster) { // OU cluster.isPrimary no Node.js 16+
    logger.info(`Master ${process.pid} is running`);
    logger.info(`Número de CPUs disponíveis: ${numCPUs}`);

    // Cria um worker para cada CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Reinicia um worker se ele sair (morrer)
    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}. Starting a new worker...`);
        cluster.fork(); // Cria um novo worker para substituir o que morreu
    });

    // Opcional: ouvir mensagens dos workers (se eles enviarem mensagens)
    cluster.on('message', (worker, message, handle) => {
        logger.debug(`Mensagem recebida do worker ${worker.process.pid}: ${JSON.stringify(message)}`);
    });

} else {
    // Worker threads podem compartilhar a porta do servidor
    // Cada worker executa o server.js
    require('./server'); // O worker agora executa o código do seu server.js
    logger.info(`Worker ${process.pid} started`);
}