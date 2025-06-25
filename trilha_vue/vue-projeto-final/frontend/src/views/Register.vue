<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1 class="register-title">Criar Conta</h1>
        <p class="register-subtitle">Junte-se a nós hoje mesmo</p>
      </div>
      
      <form @submit.prevent="register" class="register-form">
        <div class="input-group">
          <label class="input-label">Nome Completo</label>
          <input 
            type="text" 
            v-model="name" 
            required 
            class="input-field"
            placeholder="Seu nome completo"
          />
        </div>
        
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
        
        <button type="submit" class="register-button" :disabled="isLoading">
          <span v-if="!isLoading">Criar Conta</span>
          <div v-else class="loading-spinner"></div>
        </button>
        
        <div class="register-footer">
          <p class="login-link">
            Já tem uma conta? 
            <router-link to="/login" class="link">Entre aqui</router-link>
          </p>
        </div>
      </form>
    </div>
    
    <!-- Success/Error Messages -->
    <div v-if="showMessage" :class="['message', messageType]">
      <div class="message-content">
        <span class="message-icon">{{ messageType === 'success' ? '✓' : '⚠️' }}</span>
        <span class="message-text">{{ messageText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      showMessage: false,
      messageType: '',
      messageText: '',
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      this.hideMessage();
      
      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.showSuccessMessage('Conta criada com sucesso! Redirecionando...');
        
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        
      } catch (error) {
        this.showErrorMessage('Falha ao criar conta. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    },
    showSuccessMessage(text) {
      this.messageType = 'success';
      this.messageText = text;
      this.showMessage = true;
      this.autoHideMessage();
    },
    showErrorMessage(text) {
      this.messageType = 'error';
      this.messageText = text;
      this.showMessage = true;
      this.autoHideMessage();
    },
    hideMessage() {
      this.showMessage = false;
    },
    autoHideMessage() {
      setTimeout(() => {
        this.hideMessage();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 32px 64px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.register-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.register-subtitle {
  color: #64748b;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
}

.register-form {
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

.register-button {
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
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.register-button:active:not(:disabled) {
  transform: translateY(0);
}

.register-button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.register-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.register-button:hover:not(:disabled)::before {
  left: 100%;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.register-footer {
  text-align: center;
  margin-top: 24px;
}

.login-link {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 350px;
}

.message.success {
  background: rgba(34, 197, 94, 0.9);
  color: white;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.message.error {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.message-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.message-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.message-text {
  font-size: 14px;
  font-weight: 500;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

/* Responsividade */
@media (max-width: 480px) {
  .register-container {
    padding: 16px;
  }
  
  .register-card {
    padding: 32px 24px;
  }
  
  .register-title {
    font-size: 28px;
  }
  
  .message {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

/* Validação visual */
.input-field:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.input-field:valid:not(:placeholder-shown) {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
}
</style>