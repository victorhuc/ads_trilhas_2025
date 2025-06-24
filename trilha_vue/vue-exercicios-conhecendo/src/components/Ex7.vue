<template>
  <div>
    <h2>Exercício 7: Eventos de Teclado</h2>
    <input
      type="text"
      v-model="textInput"
      @keyup.enter="saveText"
      @keyup.esc="clearText"
      placeholder="Digite algo (Enter para salvar, Esc para apagar)"
    />
    <p><strong>Texto Salvo:</strong> {{ savedText || 'Nenhum texto salvo' }}</p>
    <p><em>Pressione Enter para salvar, Esc para apagar.</em></p>
  </div>
</template>

<script>
export default {
  name: 'Ex7',
  data() {
    return {
      textInput: '',
      savedText: ''
    };
  },
  methods: {
    saveText() {
      this.savedText = this.textInput;
      alert('Texto salvo: ' + this.savedText);
    },
    clearText() {
      this.textInput = '';
      this.savedText = '';
      alert('Texto apagado!');
    }
  }
};
</script>

<style scoped>
input {
  padding: 10px;
  width: 350px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
strong {
  color: #35495e;
}
em {
  color: #666;
  font-size: 0.9em;
}
</style>