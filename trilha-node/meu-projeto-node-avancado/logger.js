const winston = require('winston');

// Define os formatos de log
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
);

const logger = winston.createLogger({
    level: 'info', // Nível mínimo de log: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    format: logFormat,
    transports: [
        // Salva logs de INFO e acima em combined.log
        new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
        // Salva logs de ERRO e acima em error.log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Exibe logs no console (para desenvolvimento)
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Adiciona cores ao console
                logFormat
            )
        })
    ]
});

module.exports = logger;
