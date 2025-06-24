// 3 -  Instale o pacote axios e use-o para fazer uma requisição GET para uma API.

const axios = require('axios');

console.log("Fazendo requisição GET para a API...");

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        // Se a requisição for bem-sucedida
        console.log('Dados recebidos da API:');
        console.log('Título:', response.data.title);
        console.log('Corpo:', response.data.body);
        // console.log(response.data); // Para ver todos os dados
    })
    .catch(error => {
        // Se houver um erro na requisição
        console.error('Erro ao fazer a requisição:', error.message);
    });

console.log("Requisição enviada. Processando outras tarefas enquanto aguardo a resposta...");