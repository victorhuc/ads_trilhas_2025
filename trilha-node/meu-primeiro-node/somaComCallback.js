// 6 - Escreva uma função que use callbacks para somar dois números.

/**
 * Função que simula uma operação assíncrona para somar dois números
 * e retorna o resultado através de um callback.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @param {function(Error|null, number|null): void} callback - A função de callback
 * que será chamada com um erro (se houver) ou o resultado da soma.
 */
function somarComAtraso(a, b, callback) {
    // Simula um atraso, como se fosse uma operação de rede ou banco de dados
    setTimeout(() => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            // Se os inputs não forem números, passa um erro para o callback
            callback(new Error('Ambos os argumentos devem ser números.'), null);
            return;
        }
        const resultado = a + b;
        // Chama o callback, passando null para erro e o resultado para sucesso
        callback(null, resultado);
    }, 1000); // Atraso de 1 segundo
}

// Exemplo de uso da função:
console.log("Iniciando a soma...");

somarComAtraso(5, 3, (err, resultado) => {
    if (err) {
        console.error('Erro na soma:', err.message);
    } else {
        console.log('Resultado da soma (5 + 3):', resultado); // Deve ser 8
    }
});

somarComAtraso(10, -2, (err, resultado) => {
    if (err) {
        console.error('Erro na soma:', err.message);
    } else {
        console.log('Resultado da soma (10 + -2):', resultado); // Deve ser 8
    }
});

somarComAtraso('texto', 5, (err, resultado) => {
    if (err) {
        console.error('Erro na soma (exemplo de erro):', err.message); // Deve mostrar o erro
    } else {
        console.log('Resultado da soma (não deveria acontecer):', resultado);
    }
});

console.log("Chamadas de soma enviadas. O script continua...");