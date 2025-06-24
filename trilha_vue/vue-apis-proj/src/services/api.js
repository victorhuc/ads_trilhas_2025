import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' // Exemplo de API pública
});

export default api;
