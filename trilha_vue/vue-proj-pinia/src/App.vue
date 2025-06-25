<template>
  <div class="app">
    <h1>Minha Loja</h1>

    <!-- Lista de Produtos -->
    <ListaProdutos />

    <!-- Carrinho -->
    <hr />
    <div>
      <h2>Carrinho</h2>

      <ul>
        <li v-for="item in carrinho.itens" :key="item.id">
          {{ item.title }} - R$ {{ item.price }} × {{ item.quantidade }}
          <button @click="carrinho.removerProduto(item.id)">Remover</button>
        </li>
      </ul>

      <p><strong>Total:</strong> R$ {{ carrinho.total.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import ListaProdutos from './components/ListaProdutos.vue'
import { useCarrinhoStore } from './stores/carrinhoStore'

const carrinho = useCarrinhoStore()
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
