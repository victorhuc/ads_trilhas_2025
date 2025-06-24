<template>
  <div>
    <h1>Meu Projeto Vue + Axios</h1>
    <TesteAPI />
  </div>
</template>

<template>
  <div>
    <h1>Aplicação de Busca de Endereço</h1>
    <BuscaCEP />
  </div>
</template>
<p v-if="erro && !loading" style="color: red;">{{ erroMensagem }}</p>

<template>
  <div>
    <h1>Aplicações com APIs</h1>
    <BuscaCEP />
    <hr />
    <ClimaCidade />
  </div>
</template>

<script setup>
import TesteAPI from './components/TesteAPI.vue';
import BuscaCEP from './components/BuscaCEP.vue'; 
import ClimaCidade from './components/ClimaCidade.vue';

</script>

