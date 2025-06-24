<template>
  <div>
    <h2>Buscar Clima por Cidade</h2>

    <input v-model="cidade" placeholder="Digite o nome da cidade" />

    <select v-model="unidade">
      <option value="metric">Celsius (°C)</option>
      <option value="imperial">Fahrenheit (°F)</option>
    </select>

    <button @click="buscarClima">Buscar</button>

    <!-- Loading -->
    <p v-if="loading">Carregando dados...</p>

    <!-- Clima -->
    <div v-if="clima && !loading">
      <h3>Clima em {{ clima.name }}</h3>
      <p>
        <strong>Temperatura:</strong> {{ clima.main.temp }}°
        {{ unidade === 'metric' ? 'C' : 'F' }}
      </p>
      <p><strong>Condição:</strong> {{ clima.weather[0].description }}</p>
      <p><strong>Umidade:</strong> {{ clima.main.humidity }}%</p>
    </div>

    <!-- Erro -->
    <p v-if="erro && !loading" style="color: red;">Cidade não encontrada.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const API_KEY = 'SUA_API_KEY_AQUI'; // sua chave da OpenWeatherMap
const cidade = ref('');
const unidade = ref('metric');
const clima = ref(null);
const erro = ref(false);
const loading = ref(false); // <--- nova variável de controle

const buscarClima = async () => {
  erro.value = false;
  erroMensagem.value = '';
  clima.value = null;
  loading.value = true;

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade.value}&appid=${API_KEY}&lang=pt_br&units=${unidade.value}`
    );
    clima.value = res.data;
  } catch (e) {
    erro.value = true;
    if (e.response && e.response.status === 404) {
      erroMensagem.value = 'Cidade não encontrada. Verifique o nome digitado.';
    } else if (e.code === 'ERR_NETWORK') {
      erroMensagem.value = 'Erro de conexão. Verifique sua internet.';
    } else {
      erroMensagem.value = 'Erro inesperado. Tente novamente mais tarde.';
    }
    console.error('Erro ao buscar clima:', e);
  } finally {
    loading.value = false;
  }
};

</script>
