<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Bem-vindo</h1>
        <p class="login-subtitle">Entre na sua conta</p>
      </div>
      
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <label class="input-label">Email</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            class="input-field"
            placeholder="seu@email.com"
          />
        </div>
        
        <div class="input-group">
          <label class="input-label">Senha</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            class="input-field"
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" class="login-button">
          <span>Entrar</span>
        </button>
        
        <div class="login-footer">
          <a href="/register" class="register-link">Não tem uma conta? Clique aqui</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';  
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        const { token, user } = response.data;
        const authStore = useAuthStore();
        authStore.login(token, user);

        this.$router.push('/dashboard');
      } catch (error) {
        alert('Login failed!');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 32px 64px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: #64748b;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.input-field {
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  color: #374151;
}

.input-field::placeholder {
  color: #9ca3af;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.login-button:active {
  transform: translateY(0);
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.login-button:hover::before {
  left: 100%;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }
  
  .login-card {
    padding: 32px 24px;
  }
  
  .login-title {
    font-size: 28px;
  }
}

/* Animações */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>