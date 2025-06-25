// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null
  }),
  actions: {
    login(usuario, token) {
      this.usuario = usuario
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.usuario = null
      this.token = null
      localStorage.removeItem('token')
    },
    carregarToken() {
      this.token = localStorage.getItem('token')
    }
  }
})
