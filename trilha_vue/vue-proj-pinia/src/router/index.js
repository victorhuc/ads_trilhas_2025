import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // rota protegida
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware de autenticação
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
