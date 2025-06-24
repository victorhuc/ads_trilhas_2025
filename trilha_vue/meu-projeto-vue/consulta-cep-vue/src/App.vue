<template>
  <div id="app">
    <h1>Consulta de CEP</h1>
    <div class="cep-form">
      <label for="cepInput">Digite o CEP:</label>
      <input type="text" id="cepInput" v-model="cep" @input="formatCep" @keyup.enter="searchCep" maxlength="9"
        placeholder="Ex: 01001-000" />
      <button @click="searchCep">Buscar CEP</button>
    </div>

    <p v-if="loading">Buscando dados do CEP...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="address.cep" class="address-details">
      <h2>Endereço Encontrado:</h2>
      <p><strong>CEP:</strong> {{ address.cep }}</p>
      <p><strong>Logradouro:</strong> {{ address.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ address.bairro }}</p>
      <p><strong>Cidade:</strong> {{ address.localidade }}</p>
      <p><strong>Estado:</strong> {{ address.uf }}</p>
      <p v-if="address.complemento"><strong>Complemento:</strong> {{ address.complemento }}</p>
    </div>
    <p v-else-if="!loading && !error && searchAttempted">Nenhum endereço encontrado para o CEP informado.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      cep: '',
      address: {},
      loading: false,
      error: null,
      searchAttempted: false, // Flag para saber se uma busca foi tentada
    };
  },
  methods: {
    formatCep() {
      // Remove tudo que não for dígito
      let value = this.cep.replace(/\D/g, '');
      // Adiciona o hífen após o 5º dígito
      if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
      }
      this.cep = value;
    },
    async searchCep() {
      this.searchAttempted = true;
      this.loading = true;
      this.error = null;
      this.address = {}; // Limpa dados anteriores

      // Remove o hífen para a requisição da API
      const cleanCep = this.cep.replace('-', '');

      if (cleanCep.length !== 8) {
        this.error = 'Por favor, insira um CEP válido com 8 dígitos.';
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
        if (response.data.erro) {
          this.error = 'CEP não encontrado.';
        } else {
          this.address = response.data;
        }
      } catch (err) {
        this.error = 'Erro ao consultar CEP: ' + err.message;
        console.error('Erro ao consultar CEP:', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cep-form {
  margin-bottom: 30px;
}

.cep-form label {
  margin-right: 10px;
  font-weight: bold;
}

.cep-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 150px;
  text-align: center;
}

.cep-form button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.cep-form button:hover {
  opacity: 0.9;
}

.error {
  color: red;
  margin-top: 15px;
}

.address-details {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.address-details p {
  margin-bottom: 5px;
}

.address-details h2 {
  margin-top: 0;
  color: #35495e;
}
</style>
