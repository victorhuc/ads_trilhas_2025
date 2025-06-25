<template>
  <div>
    <h2>Login</h2>
    <button @click="loginFake">Entrar</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function loginFake() {
  auth.login({ nome: 'Usuário' }, 'token-fake')
  router.push('/dashboard')
}
</script>
