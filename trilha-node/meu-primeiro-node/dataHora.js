// 8 - Desenvolva um script que exiba a data e hora atuais formatadas no terminal.

console.log("Exibindo data e hora atuais:");

const dataAtual = new Date();

// Opções de formatação para data
const opcoesData = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesData);

// Opções de formatação para hora
const opcoesHora = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Formato 24h
};
const horaFormatada = dataAtual.toLocaleTimeString('pt-BR', opcoesHora);

console.log(`Data: ${dataFormatada}`);
console.log(`Hora: ${horaFormatada}`);
console.log(`Data e Hora Completas: ${dataAtual.toLocaleString('pt-BR')}`);

// Exemplo de formato ISO (útil para APIs)
console.log(`Formato ISO: ${dataAtual.toISOString()}`);