<template>
  <div>
    <h2>Exercício 9: Ciclo de Vida do Componente</h2>
    <p>{{ message }}</p>
    <p v-if="loading">Carregando dados fictícios...</p>
    <p v-if="dataLoaded">Dados carregados: "{{ fictiveData.text }}" (ID: {{ fictiveData.id }})</p>
  </div>
</template>

<script>
export default {
  name: 'Ex9',
  data() {
    return {
      message: 'Verifique o console para os logs do ciclo de vida!',
      loading: false,
      dataLoaded: false,
      fictiveData: null
    };
  },
  beforeCreate() {
    console.log('Ex9: beforeCreate - Componente prestes a ser criado.');
    // Dados e eventos ainda não estão disponíveis.
  },
  created() {
    console.log('Ex9: created - Componente criado, dados reativos e eventos disponíveis.');
    // Ideal para buscar dados iniciais (sem manipulação do DOM).
  },
  beforeMount() {
    console.log('Ex9: beforeMount - Template será compilado e montado no DOM.');
  },
  mounted() {
    console.log('Ex9: mounted - Componente montado no DOM. Posso manipular o DOM.');
    this.simulateApiCall(); // Realiza a requisição simulada aqui
  },
  beforeUpdate() {
    console.log('Ex9: beforeUpdate - Dados alterados, DOM prestes a ser atualizado.');
  },
  updated() {
    console.log('Ex9: updated - DOM foi atualizado.');
  },
  beforeUnmount() { // Vue 3 lifecycle hook (Vue 2 era beforeDestroy)
    console.log('Ex9: beforeUnmount - Componente prestes a ser desmontado.');
  },
  unmounted() { // Vue 3 lifecycle hook (Vue 2 era destroyed)
    console.log('Ex9: unmounted - Componente foi desmontado.');
  },
  methods: {
    simulateApiCall() {
      this.loading = true;
      console.log('Ex9: Simulando requisição API fictícia...');
      setTimeout(() => {
        this.fictiveData = { id: Math.floor(Math.random() * 1000), text: 'Dados fictícios carregados!' };
        this.loading = false;
        this.dataLoaded = true;
        console.log('Ex9: Requisição simulada concluída.');
      }, 2000); // Simula um atraso de 2 segundos
    }
  }
};
</script>

<style scoped>
/* Estilos específicos do componente */
</style>