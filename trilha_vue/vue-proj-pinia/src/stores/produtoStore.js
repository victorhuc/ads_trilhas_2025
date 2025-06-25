// src/stores/produtoStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    carregando: false,
    erro: null
  }),
  actions: {
    async buscarProdutos() {
      this.carregando = true
      this.erro = null
      try {
        const res = await axios.get('https://fakestoreapi.com/products') // exemplo de API pública
        this.produtos = res.data
      } catch (e) {
        this.erro = 'Erro ao buscar produtos'
        console.error(e)
      } finally {
        this.carregando = false
      }
    }
  }
})
