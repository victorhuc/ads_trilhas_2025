<template>
  <div>
    <h2>CRUD de Produtos</h2>

    <form @submit.prevent="salvarProduto">
      <input v-model="produto.nome" placeholder="Nome" required />
      <input v-model.number="produto.preco" placeholder="Preço" required />
      <button type="submit">{{ produto.id ? 'Atualizar' : 'Adicionar' }}</button>
    </form>

    <ul>
      <li v-for="item in produtos" :key="item.id">
        {{ item.nome }} - R$ {{ item.preco }}
        <button @click="editarProduto(item)">Editar</button>
        <button @click="excluirProduto(item.id)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

const produtos = ref([]);
const produto = ref({ nome: '', preco: '' });

const carregarProdutos = async () => {
  const res = await api.get('/produtos');
  produtos.value = res.data;
};

const salvarProduto = async () => {
  if (produto.value.id) {
    await api.put(`/produtos/${produto.value.id}`, produto.value);
  } else {
    await api.post('/produtos', produto.value);
  }
  produto.value = { nome: '', preco: '' };
  carregarProdutos();
};

const editarProduto = (item) => {
  produto.value = { ...item };
};

const excluirProduto = async (id) => {
  await api.delete(`/produtos/${id}`);
  carregarProdutos();
};

onMounted(() => carregarProdutos());
</script>
