<template>
  <div>
    <h2>Exercício 4: Reatividade de Array</h2>
    <p>Array Original: {{ myArr }}</p>
    <input type="number" v-model.number="indexToUpdate" placeholder="Índice" />
    <input type="text" v-model="newValue" placeholder="Novo Valor" />
    <button @click="updateArrayItem">Atualizar Item</button>
    <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Ex4',
  data() {
    return {
      myArr: ['Red', 'Green', 'Blue', 'Yellow'],
      indexToUpdate: 0,
      newValue: '',
      message: '',
      messageColor: ''
    };
  },
  methods: {
    updateArrayItem() {
      const index = this.indexToUpdate;
      const value = this.newValue;

      if (index < 0 || index >= this.myArr.length || !Number.isInteger(index)) {
        this.message = 'Índice inválido! Digite um número inteiro dentro dos limites do array.';
        this.messageColor = 'red';
        return;
      }

      // Em Vue 3, a reatividade funciona diretamente para atribuições de índice.
      this.myArr[index] = value;
      // Se estivesse usando Vue 2 e a atribuição direta não funcionasse, usaria:
      // Vue.set(this.myArr, index, value);

      this.message = `Item no índice <span class="math-inline">\{index\} atualizado para "</span>{value}".`;
      this.messageColor = 'green';
      this.newValue = '';
    }
  }
};
</script>

<style scoped>
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 5px 10px;
}
button {
  background-color: #e74c3c;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #c0392b;
}
</style>