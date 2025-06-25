<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <div class="header-actions">
        <button @click="startCreating" class="btn-primary">
          <span class="btn-icon">+</span>
          Adicionar Produto
        </button>
        <button @click="loadProducts" class="btn-secondary">
          <span class="btn-icon">⟳</span>
          Recarregar
        </button>
        <button @click="logout" class="btn-secondary">
          <span class="btn-icon"></span>
          Logout
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-section">
      <div v-if="products.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>Nenhum produto encontrado</h3>
        <p>Comece adicionando seu primeiro produto</p>
      </div>
      
      <div v-else class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">R$ {{ formatPrice(product.price) }}</div>
          </div>
          <div class="product-actions">
            <button @click="editProduct(product)" class="btn-edit">
              <span class="btn-icon">✏️</span>
              Editar
            </button>
            <button @click="confirmDelete(product.id)" class="btn-delete">
              <span class="btn-icon">🗑️</span>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Form -->
    <div v-if="isEditing || isCreating" class="modal-overlay" @click="cancelEdit">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">{{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
          <button @click="cancelEdit" class="btn-close">×</button>
        </div>
        
        <form @submit.prevent="saveProduct" class="product-form">
          <div class="form-group">
            <label class="form-label">Nome do Produto</label>
            <input 
              type="text" 
              v-model="productForm.name" 
              placeholder="Digite o nome do produto" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Preço</label>
            <input 
              type="number" 
              v-model="productForm.price" 
              placeholder="0,00" 
              step="0.01" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Categoria</label>
            <input 
              type="text" 
              v-model="productForm.category" 
              placeholder="Ex: Eletrônicos, Roupas..." 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea 
              v-model="productForm.description" 
              placeholder="Descreva o produto..." 
              required 
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-save">
              {{ isEditing ? 'Salvar Alterações' : 'Adicionar Produto' }}
            </button>
            <button type="button" @click="cancelEdit" class="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';  
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      isEditing: false,
      isCreating: false,
      productForm: {
        name: '',
        price: '',
        category: '',
        description: '',
        id: null,
      },
    };
  },
  methods: {
    async loadProducts() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) {
          alert('Token inválido ou não encontrado!');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.products = response.data;
      } catch (error) {
        console.error(error);
        alert('Falha ao carregar produtos!');
      }
    },
    editProduct(product) {
      this.productForm = { ...product }; 
      this.isEditing = true; 
      this.isCreating = false;
    },
    async saveProduct() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) {
          alert('Token inválido ou não encontrado!');
          return;
        }

        if (this.isEditing) {
          await axios.put(`http://localhost:3000/api/products/${this.productForm.id}`, this.productForm, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (this.isCreating) {
          await axios.post('http://localhost:3000/api/products', this.productForm, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        this.loadProducts(); 
        this.cancelEdit(); 
      } catch (error) {
        console.error(error);
        alert('Falha ao salvar o produto!');
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.isCreating = false;
      this.productForm = { name: '', price: '', category: '', description: '', id: null }; 
    },
    confirmDelete(productId) {
      const confirmed = window.confirm('Você tem certeza que deseja excluir este produto?');
      if (confirmed) {
        this.deleteProduct(productId);  
      }
    },
    async deleteProduct(productId) {
      try {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) {
          alert('Token inválido ou não encontrado!');
          return;
        }

        await axios.delete(`http://localhost:3000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.loadProducts(); 
      } catch (error) {
        console.error(error);
        alert('Failed to delete product!');
      }
    },
    startCreating() {
      this.isCreating = true;
      this.isEditing = false;
      this.productForm = { name: '', price: '', category: '', description: '', id: null }; 
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();  // Limpar token e dados do usuário
      this.$router.push('/login');  // Redirecionar para a página de login
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2).replace('.', ',');
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.dashboard-title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: white;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
}

.products-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: #374151;
  font-size: 24px;
  margin: 0 0 8px 0;
}

.empty-state p {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
}

.product-info {
  margin-bottom: 20px;
}

.product-name {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.product-category {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
}

.product-description {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.btn-edit:hover {
  background: rgba(102, 126, 234, 0.2);
}

.btn-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: #6b7280;
}

.product-form {
  padding: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  color: #374151;
  box-sizing: border-box;
}

.form-input::placeholder, .form-textarea::placeholder {
  color: #9ca3af;
}

.form-input:focus, .form-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-save, .btn-cancel {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-save {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .products-section {
    padding: 20px;
  }
  
  .modal-content {
    margin: 10px;
  }
  
  .modal-header, .product-form {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
