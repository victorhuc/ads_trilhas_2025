<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Exercícios Vuetify</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item v-for="(exercise, i) in exercises" :key="i" @click="currentExercise = exercise.component">
          <v-list-item-icon>
            <v-icon>{{ exercise.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ exercise.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-card class="pa-5 mb-5" elevation="2">
          <h2 class="text-h5 text-center">{{ exercises.find(e => e.component === currentExercise).title }}</h2>
          <v-divider class="my-3"></v-divider>
          <component :is="currentExerciseComponent"></component>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// Importe seus componentes de exercício aqui
import Ex1 from './components/Ex1.vue';
import Ex2 from './components/Ex2.vue';
import Ex3 from './components/Ex3.vue';
import Ex4 from './components/Ex4.vue';
import Ex5 from './components/Ex5.vue';
import Ex6 from './components/Ex6.vue';
import Ex7 from './components/Ex7.vue';
import Ex8 from './components/Ex8.vue';
import Ex9 from './components/Ex9.vue';
import Ex10 from './components/Ex10.vue';

export default {
  name: 'App',
  components: {
    Ex1,
    Ex2,
    Ex3,
    Ex4,
    Ex5,
    Ex6,
    Ex7,
    Ex8,
    Ex9,
    Ex10,
  },
  data: () => ({
    drawer: false,
    currentExercise: 'Ex1', // Começa no Exercício 1
    exercises: [
      { title: 'Exercício 1: Grid Básico', icon: 'mdi-view-grid', component: 'Ex1' },
      { title: 'Exercício 2: Botão Estilizado', icon: 'mdi-gesture-tap-button', component: 'Ex2' },
      { title: 'Exercício 3: Card com Ação', icon: 'mdi-card-outline', component: 'Ex3' },
      { title: 'Exercício 4: Modal (v-dialog)', icon: 'mdi-message-text', component: 'Ex4' },
      { title: 'Exercício 5: Toolbar e Navigation Drawer', icon: 'mdi-menu', component: 'Ex5' },
      { title: 'Exercício 6: Data Table Estática', icon: 'mdi-table', component: 'Ex6' },
      { title: 'Exercício 7: Formulário de Login', icon: 'mdi-form-select', component: 'Ex7' },
      { title: 'Exercício 8: Tema Customizado', icon: 'mdi-palette', component: 'Ex8' },
      { title: 'Exercício 9: SCSS Customizado', icon: 'mdi-sass', component: 'Ex9' },
      { title: 'Exercício 10: Data Table com API', icon: 'mdi-api', component: 'Ex10' },
    ],
  }),
  computed: {
    currentExerciseComponent() {
      return this.currentExercise;
    },
  },
};
</script>

<style>

</style>