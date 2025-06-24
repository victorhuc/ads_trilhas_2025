<template>
  <div class="protected-page card p-4 mx-auto mt-5 text-center" style="max-width: 600px;">
    <h2 class="card-title text-success mb-4">Página Protegida!</h2>
    <p class="mb-3">🎉 Bem-vindo(a)! Você está vendo este conteúdo porque está autenticado.</p>
    <p class="text-muted">Esta rota é protegida por um token JWT.</p>

    <button @click="fetchProtectedData" class="btn btn-info mt-3">
      Buscar Dados Protegidos do Backend
    </button>
    <div v-if="protectedData" class="alert alert-success mt-3" role="alert">
      <strong>Dados do Backend:</strong> {{ protectedData }}
    </div>
    <div v-if="errorProtectedData" class="alert alert-danger mt-3" role="alert">
      {{ errorProtectedData }}
    </div>

    <button @click="logout" class="btn btn-danger mt-4">
      Sair (Logout)
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Para redirecionar

const router = useRouter();
const protectedData = ref(null);
const errorProtectedData = ref(null);

const API_URL = import.meta.env.VITE_API_URL;

const fetchProtectedData = async () => {
  protectedData.value = null;
  errorProtectedData.value = null;
  const token = localStorage.getItem('jwt_token'); // Pega o token do localStorage

  if (!token) {
    errorProtectedData.value = 'Token não encontrado. Faça login novamente.';
    // O router.beforeEach já deve redirecionar, mas este é um fallback
    router.push('/login');
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: {
        'x-auth-token': token, // Envia o token no cabeçalho 'x-auth-token'
      },
    });
    protectedData.value = JSON.stringify(response.data, null, 2); // Exibe formatado
  } catch (err) {
    console.error('Erro ao buscar dados protegidos:', err);
    if (err.response && err.response.data && err.response.data.message) {
      errorProtectedData.value = err.response.data.message;
    } else {
      errorProtectedData.value = 'Ocorreu um erro ao buscar dados protegidos.';
    }
    // Se o erro for 401 (Não Autorizado), o token pode estar inválido/expirado
    if (err.response && err.response.status === 401) {
      alert('Sua sessão expirou ou o token é inválido. Faça login novamente.');
      logout(); // Desloga o usuário
    }
  }
};

const logout = () => {
  localStorage.removeItem('jwt_token'); // Remove o token do localStorage
  router.push('/login'); // Redireciona para a página de login
};
</script>

<style scoped>
.protected-page {
  background-color: #e6ffe6; /* Um verde bem clarinho */
  border: 1px solid #28a745; /* Borda verde */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>