<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div class="d-flex">
          <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link to="/protected" class="btn btn-outline-light">Página Protegida</router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>

      <hr class="my-5">
      <UserList />
    </div>
  </div>
</template>

<script setup>
import UserList from './components/UserList.vue';
// Você pode remover o HomeView se não for usar o conteúdo padrão dela,
// ou deixá-la como a Home padrão.
</script>

<style>
/* Importe o Bootstrap CSS em main.js para aplicação global */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.navbar-brand, .btn-outline-light {
  text-decoration: none;
}
</style>