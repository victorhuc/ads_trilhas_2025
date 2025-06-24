<template>
  <div>
    <h2>Exercício 1: Olá, Vue.js!</h2>
    <p>{{ message }}</p>
    <button @click="changeMessage">Alternar Mensagem</button>
  </div>
</template>

<script>
export default {
  name: 'Ex1',
  data() {
    return {
      message: 'Olá, Vue.js!'
    };
  },
  methods: {
    changeMessage() {
      this.message = (this.message === 'Olá, Vue.js!') ? 'Mensagem Alterada!' : 'Olá, Vue.js!';
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
button:hover {
  background-color: #45a049;
}
</style>