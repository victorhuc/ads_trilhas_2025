<template>
  <div id="app">
    <h1>Gerenciador de Usuários</h1>

    <div class="form-container">
      <h2>Adicionar Novo Usuário</h2>
      <form @submit.prevent="addUser">
        <input type="text" v-model="newUser.name" placeholder="Nome" required />
        <input type="email" v-model="newUser.email" placeholder="Email" required />
        <button type="submit">Adicionar Usuário</button>
      </form>
      <p v-if="addError" class="error">{{ addError }}</p>
    </div>

    <hr />

    <p v-if="loading">Carregando usuários...</p>
    <p v-if="fetchError" class="error">{{ fetchError }}</p>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteUser(user.id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!loading && !fetchError">Nenhum usuário encontrado.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      users: [],
      loading: false,
      fetchError: null,
      newUser: {
        name: '',
        email: ''
      },
      addError: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.fetchError = null;
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        this.users = response.data;
      } catch (err) {
        this.fetchError = 'Erro ao buscar usuários: ' + err.message;
        console.error('Erro ao buscar usuários:', err);
      } finally {
        this.loading = false;
      }
    },
    async addUser() {
      this.addError = null;
      try {
        const response = await axios.post('http://localhost:3000/usuarios', this.newUser);
        this.users.push(response.data); // Adiciona o novo usuário à lista
        this.newUser = { name: '', email: '' }; // Limpa o formulário
      } catch (err) {
        this.addError = 'Erro ao adicionar usuário: ' + (err.response?.data?.message || err.message);
        console.error('Erro ao adicionar usuário:', err);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        this.users = this.users.filter(user => user.id !== id); // Remove o usuário da lista local
      } catch (err) {
        alert('Erro ao remover usuário: ' + (err.response?.data?.message || err.message));
        console.error('Erro ao remover usuário:', err);
      }
    }
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #35495e;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
}

button:hover {
  opacity: 0.9;
}

button:last-child {
  /* Estilo para o botão remover */
  background-color: #e74c3c;
}

.form-container {
  max-width: 600px;
  margin: 0 auto 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 40px 0;
}
</style>