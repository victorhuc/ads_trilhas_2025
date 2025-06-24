import { createRouter, createWebHistory } from 'vue-router'
// Importa o componente Home (pode ser o padrão gerado pelo Vue CLI)
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // Carrega o componente de login lazy-loaded (sob demanda)
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/protected',
      name: 'protected',
      // Carrega o componente da página protegida lazy-loaded
      component: () => import('../views/ProtectedPage.vue'),
      meta: { requiresAuth: true }, // Metadado que indica que esta rota requer autenticação
    },
  ],
})

// Guardião de rota global que será executado antes de cada navegação
router.beforeEach((to, from, next) => {
  // Verifica se a rota para a qual estamos indo requer autenticação
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('jwt_token'); // Tenta obter o token JWT do localStorage

    if (token) {
      // Se o token existe, o usuário está autenticado, permite a navegação
      next();
    } else {
      // Se o token não existe, redireciona o usuário para a página de login
      alert('Você precisa estar logado para acessar esta página.'); // Alerta para o usuário
      next('/login');
    }
  } else {
    // Se a rota não requer autenticação, permite a navegação normalmente
    next();
  }
});

export default router;