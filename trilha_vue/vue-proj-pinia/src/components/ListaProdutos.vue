<script setup>
import { onMounted } from 'vue'
import { useProdutoStore } from '../stores/produtoStore'
import { useCarrinhoStore } from '../stores/carrinhoStore'

const produtoStore = useProdutoStore()
const carrinhoStore = useCarrinhoStore()

onMounted(() => {
  produtoStore.buscarProdutos()
})
</script>

<template>
  <div>
    <h2>Lista de Produtos</h2>

    <p v-if="produtoStore.carregando">Carregando produtos...</p>
    <p v-if="produtoStore.erro" style="color: red">{{ produtoStore.erro }}</p>

    <ul v-if="!produtoStore.carregando && !produtoStore.erro">
      <li v-for="p in produtoStore.produtos" :key="p.id">
        {{ p.title }} - R$ {{ p.price }}
      </li>
    </ul>
  </div>
</template>
