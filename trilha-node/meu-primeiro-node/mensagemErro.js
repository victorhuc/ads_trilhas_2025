// 4 - Use o pacote chalk para exibir uma mensagem de erro em vermelho no terminal

const chalk = require('chalk');

// Exibe uma mensagem de erro em vermelho
console.error(chalk.red('ERRO: Algo inesperado aconteceu. Por favor, tente novamente mais tarde.'));

// Exemplo de outras cores e estilos (opcional)
console.log(chalk.blue('Esta é uma mensagem azul.'));
console.log(chalk.green.bold('Esta é uma mensagem verde e em negrito.'));