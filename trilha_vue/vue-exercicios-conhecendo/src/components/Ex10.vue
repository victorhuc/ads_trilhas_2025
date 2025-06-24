<template>
  <div>
    <h2>Exercício 10: Carrinho de Compras</h2>

    <div class="add-item-section">
      <h3>Adicionar Novo Item</h3>
      <input type="text" v-model="newItem.name" placeholder="Nome do Item" required />
      <input type="number" v-model.number="newItem.price" placeholder="Preço" step="0.01" required />
      <input type="number" v-model.number="newItem.quantity" placeholder="Qtd" min="1" required />
      <button @click="addItem">Adicionar ao Carrinho</button>
      <p v-if="itemError" class="error-message">{{ itemError }}</p>
    </div>

    <hr />

    <table v-if="cartItems.length > 0" class="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Preço Unitário</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>R$ {{ item.price.toFixed(2) }}</td>
          <td>{{ item.quantity }}</td>
          <td>R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
          <td>
            <button @click="removeItem(item.id)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"><strong>Total Geral:</strong></td>
          <td><strong>R$ {{ overallTotal.toFixed(2) }}</strong></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <p v-else class="empty-cart-message">Seu carrinho está vazio.</p>
  </div>
</template>

<script>
export default {
  name: 'Ex10',
  data() {
    return {
      newItem: {
        name: '',
        price: null, // Use null para validação inicial
        quantity: 1
      },
      cartItems: [],
      nextId: 1,
      itemError: ''
    };
  },
  computed: {
    overallTotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  },
  methods: {
    addItem() {
      this.itemError = '';
      if (!this.newItem.name.trim()) {
        this.itemError = 'O nome do item é obrigatório.';
        return;
      }
      if (this.newItem.price === null || this.newItem.price <= 0 || isNaN(this.newItem.price)) {
        this.itemError = 'O preço deve ser um número positivo.';
        return;
      }
      if (this.newItem.quantity === null || this.newItem.quantity <= 0 || !Number.isInteger(this.newItem.quantity)) {
        this.itemError = 'A quantidade deve ser um número inteiro positivo.';
        return;
      }

      const itemToAdd = {
        id: this.nextId++,
        name: this.newItem.name.trim(),
        price: parseFloat(this.newItem.price),
        quantity: parseInt(this.newItem.quantity)
      };
      this.cartItems.push(itemToAdd);

      // Limpa o formulário
      this.newItem = { name: '', price: null, quantity: 1 };
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
  }
};
</script>

<style scoped>
.add-item-section {
  max-width: 600px;
  margin: 0 auto 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.add-item-section input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.add-item-section button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
.add-item-section button:hover {
  background-color: #45a049;
}
.error-message {
  color: red;
  margin-top: 10px;
}
hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 40px 0;
}
.cart-table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
}
.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.cart-table th {
  background-color: #f2f2f2;
  color: #35495e;
}
.cart-table button {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cart-table button:hover {
  opacity: 0.8;
}
.cart-table tfoot td {
  font-weight: bold;
  background-color: #f2f2f2;
}
.empty-cart-message {
  color: #666;
  font-style: italic;
  margin-top: 20px;
}
</style>