const { exec } = require('child_process');
const logger = require('./logger');

function executeSystemCommand(command) {
    return new Promise((resolve, reject) => {
        logger.info(`Executando comando do sistema: "${command}"`);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Erro ao executar comando "${command}": ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                logger.warn(`Saída de erro (stderr) do comando "${command}": ${stderr}`);
            }
            logger.info(`Comando "${command}" executado com sucesso.\nStdout:\n${stdout}`);
            resolve(stdout);
        });
    });
}

module.exports = { executeSystemCommand };