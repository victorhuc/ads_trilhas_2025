<template>
  <div class="login-container card p-4 mx-auto mt-5" style="max-width: 400px;">
    <h2 class="card-title text-center mb-4">Acessar Conta</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email:</label>
        <input
          type="email"
          class="form-control"
          id="emailInput"
          v-model="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Senha:</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-3">Entrar</button>
      <p v-if="error" class="text-danger text-center">{{ error }}</p>
    </form>
    <p class="text-center mt-3">
      Ainda não tem conta? Crie uma usando um cliente REST (Postman, Insomnia) ou futuramente um formulário de cadastro.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Para redirecionar

const email = ref('');
const password = ref('');
const error = ref(null); // Para exibir mensagens de erro
const router = useRouter(); // Instância do router

const API_URL = import.meta.env.VITE_API_URL; // URL do seu backend

const handleLogin = async () => {
  error.value = null; // Limpa erros anteriores
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email.value,
      password: password.value,
    });
    const { token } = response.data;
    localStorage.setItem('jwt_token', token); // Armazena o token no localStorage
    console.log('Login bem-sucedido! Token armazenado.');
    router.push('/protected'); // Redireciona para a página protegida
  } catch (err) {
    console.error('Erro no login:', err);
    // Exibe a mensagem de erro da API ou uma mensagem genérica
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
    }
  }
};
</script>

<style scoped>
.login-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>