<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        height="200px"
        cover
      ></v-img>

      <v-card-title>
        Meu Título do Card
      </v-card-title>

      <v-card-subtitle>
        Uma breve descrição ou subtítulo.
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="showAlert"
        >
          Exibir Alerta
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Ex3',
  methods: {
    showAlert() {
      alert('Você clicou no botão do card!');
    },
  },
};
</script>

<style scoped>

</style>