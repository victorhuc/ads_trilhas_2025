<template>
  <v-container>
    <v-btn
      color="#FF5722"
      class="white--text custom-button"
      @click="showMessage"
    >
      Meu Botão Laranja
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Ex2',
  methods: {
    showMessage() {
      console.log('Botão clicado! Mensagem no console.');
      alert('Cheque o console do navegador!');
    },
  },
};
</script>

<style scoped>
.custom-button {
  font-weight: bold;
  letter-spacing: 1px;
}
</style>