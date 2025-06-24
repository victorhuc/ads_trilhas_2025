<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="fazerLogin">
      <input v-model="email" placeholder="Email" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>

    <p v-if="erro" style="color: red">{{ erro }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const senha = ref('');
const erro = ref('');

const fazerLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
      email: email.value,
      senha: senha.value
    });

    const token = res.data.token;
    localStorage.setItem('token', token);

    window.location.href = '/protegido.html'; // redireciona para rota protegida
  } catch (e) {
    erro.value = 'Credenciais inválidas.';
    console.error(e);
  }
};
</script>
