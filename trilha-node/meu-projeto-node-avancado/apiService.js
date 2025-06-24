const axios = require('axios');

async function fetchDataFromApi(url) {
    try {
        const response = await axios.get(url);
        // Retorna apenas os dados da resposta
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar dados da API (${url}):`, error.message);
        // Lança o erro para ser tratado por quem chamou a função
        throw new Error(`Não foi possível buscar dados da API: ${error.message}`);
    }
}

module.exports = { fetchDataFromApi };