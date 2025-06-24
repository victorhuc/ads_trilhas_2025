<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api'; // <--- usando a instância

const resposta = ref(null);

onMounted(async () => {
  try {
    const res = await api.get('/posts/1'); // <--- apenas o caminho, sem baseURL
    resposta.value = res.data;
    console.log('Resposta da API:', res.data);
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
  }
});
</script>
