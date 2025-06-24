<template>
  <div>
    <h2>Buscar Endereço por CEP</h2>
    
    <div>
      <input v-model="cep" placeholder="Digite o CEP" />
      <button @click="buscarEndereco">Buscar</button>
    </div>

    <div v-if="endereco">
      <h3>Endereço encontrado:</h3>
      <p><strong>Rua:</strong> {{ endereco.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
      <p><strong>Cidade:</strong> {{ endereco.localidade }}</p>
      <p><strong>UF:</strong> {{ endereco.uf }}</p>
    </div>

    <div v-if="erro">
      <p style="color: red;">CEP não encontrado ou inválido!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api'; // Usando o serviço Axios criado no passo anterior

const cep = ref('');
const endereco = ref(null);
const erro = ref(false);

const buscarEndereco = async () => {
  erro.value = false;
  endereco.value = null;

  // Verifica se o CEP tem exatamente 8 números
  const cepValido = /^[0-9]{8}$/.test(cep.value);

  if (!cepValido) {
    erro.value = 'CEP inválido. Deve conter 8 números.';
    return;
  }

  try {
    const resposta = await api.get(`/ws/${cep.value}/json/`);
    if (resposta.data.erro) {
      erro.value = 'CEP não encontrado.';
    } else {
      endereco.value = resposta.data;
    }
  } catch (e) {
    erro.value = 'Erro ao buscar o CEP. Tente novamente.';
    console.error(e);
  }
};

</script>
