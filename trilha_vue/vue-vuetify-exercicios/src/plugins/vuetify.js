import Vue from 'vue'; // Se estiver usando Vue 2
import { createVuetify } from 'vuetify/lib/framework'; // Para Vue 3
import * as components from 'vuetify/lib/components';
import * as directives from 'vuetify/lib/directives';
import 'vuetify/styles'; // Importar estilos base

// Para Vue 3 (Remova as linhas do Vue 2 se não usar)
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#4CAF50', // Verde
        secondary: '#FFEB3B', // Amarelo
        // outas cores se desejar
      },
    },
  },
});

// Para Vue 2 (Mantenha este bloco se usar Vue 2)
// Vue.use(Vuetify); // Remova se já tiver uma importação similar

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: '#4CAF50', // Verde
//         secondary: '#FFEB3B', // Amarelo
//       },
//     },
//   },
// });


export default vuetify; // Para Vue 3 (mantenha)