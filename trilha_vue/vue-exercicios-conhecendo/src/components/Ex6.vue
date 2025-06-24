<template>
  <div>
    <h2>Exercício 6: Prevenindo Envio Padrão do Formulário</h2>
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="message">Mensagem:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>

      <button type="submit">Enviar Mensagem (via Alerta)</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Ex6',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // O @submit.prevent no template já impediu o recarregamento da página.
      const formDataString = `
Nome: ${this.form.name}
Email: ${this.form.email}
Mensagem: ${this.form.message}
`;
alert('Dados do Formulário:\n' + formDataString);

      // Limpar o formulário (opcional)
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.contact-form button {
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}
.contact-form button:hover {
  background-color: #27ae60;
}
</style>