<template>
  <div class="user-list-container card p-4">
    <h2 class="card-title text-center mb-4">Lista de Usuários Cadastrados</h2>
    <p v-if="loading" class="text-info text-center">Carregando usuários...</p>
    <p v-if="error" class="text-danger text-center">{{ error }}</p>

    <div v-if="users.length" class="list-group">
      <div v-for="user in users" :key="user.id" class="list-group-item list-group-item-action mb-2">
        <h5 class="mb-1"><strong>Nome:</strong> {{ user.name }}</h5>
        <p class="mb-1"><strong>Email:</strong> {{ user.email }}</p>
        <small class="text-muted">ID: {{ user.id }} | Criado em: {{ new Date(user.createdAt).toLocaleDateString() }}</small>
      </div>
    </div>
    <p v-else-if="!loading && !error" class="text-muted text-center">Nenhum usuário cadastrado ainda.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const loading = ref(true);
const error = ref(null);

// Acessa a variável de ambiente definida em .env
const API_URL = import.meta.env.VITE_API_URL;

// Função para buscar os usuários da API
const fetchUsers = async () => {
  loading.value = true;
  error.value = null; // Limpa erros anteriores
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    users.value = response.data;
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    error.value = 'Falha ao carregar usuários. Verifique a conexão do servidor.';
  } finally {
    loading.value = false;
  }
};

// Chama a função fetchUsers quando o componente é montado
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-list-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.list-group-item {
  border-left: 5px solid #007bff;
}
</style>