import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importe o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// E o JavaScript do Bootstrap (para funcionalidades como navbars responsivas, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
  .use(router)
  .mount('#app')