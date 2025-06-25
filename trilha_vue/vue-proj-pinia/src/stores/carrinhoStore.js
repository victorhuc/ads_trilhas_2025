import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: []
  }),
  getters: {
    total: (state) =>
      state.itens.reduce((soma, item) => soma + item.price * item.quantidade, 0)
  },
  actions: {
    adicionarProduto(produto) {
      const itemExistente = this.itens.find(p => p.id === produto.id)
      if (itemExistente) {
        itemExistente.quantidade++
      } else {
        this.itens.push({ ...produto, quantidade: 1 })
      }
    },
    removerProduto(id) {
      const index = this.itens.findIndex(p => p.id === id)
      if (index !== -1) {
        this.itens.splice(index, 1)
      }
    }
  }
})
