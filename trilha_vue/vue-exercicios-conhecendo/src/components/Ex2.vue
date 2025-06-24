<template>
  <div>
    <h2>Exercício 2: Contador Interativo</h2>
    <h3>Valor: {{ count }}</h3>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
  </div>
</template>

<script>
export default {
  name: 'Ex2',
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
};
</script>

<style scoped>
button {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}
button:hover {
  background-color: #007bb5;
}
h3 {
    font-size: 2.5em;
    color: #35495e;
}
</style>