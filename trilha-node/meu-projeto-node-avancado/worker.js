const { parentPort } = require('worker_threads');
const logger = require('./logger'); // Importa o logger

parentPort.on('message', async (taskData) => {
    logger.info(`Worker ${process.pid}: Iniciando tarefa para dados: ${JSON.stringify(taskData)}`);

    // Simula uma tarefa que consome CPU (ex: cálculo complexo, processamento de imagem)
    let result = 0;
    for (let i = 0; i < 1_000_000_000; i++) {
        result += Math.sqrt(i);
    }

    // Você pode adicionar mais lógica aqui para processar 'taskData'
    // Exemplo: Buscar dados externos, processar um grande array, etc.

    logger.info(`Worker ${process.pid}: Tarefa concluída. Resultado parcial: ${result.toFixed(2)}`);

    // Envia o resultado de volta para o thread principal
    parentPort.postMessage({ status: 'completed', data: taskData, result: result });
});

// Captura erros no worker thread
process.on('uncaughtException', (error) => {
    logger.error(`Worker ${process.pid}: Erro não capturado: ${error.message}`);
    parentPort.postMessage({ status: 'error', message: error.message });
    process.exit(1); // Encerra o worker para evitar estados inconsistentes
});