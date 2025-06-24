<template>
  <div>
    <h2>Exercício 8: Edição Dinâmica de Preço de Produto</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <span v-if="!product.editingPrice">R$ {{ product.price.toFixed(2) }}</span>
            <input
              v-else
              type="number"
              v-model.number="product.price"
              @keyup.enter="product.editingPrice = false"
              @blur="product.editingPrice = false"
              step="0.01"
            />
          </td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="toggleEditPrice(product)">
              {{ product.editingPrice ? 'Salvar' : 'Editar Preço' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Ex8',
  data() {
    return {
      products: [
        { id: 1, name: 'Notebook Pro', price: 3200.00, quantity: 5, editingPrice: false },
        { id: 2, name: 'Fone Bluetooth', price: 250.50, quantity: 12, editingPrice: false },
        { id: 3, name: 'Monitor UltraWide', price: 1800.00, quantity: 8, editingPrice: false }
      ]
    };
  },
  methods: {
    toggleEditPrice(product) {
      // A reatividade no Vue 3 lida com a adição de propriedades diretamente.
      // Em Vue 2, para adicionar uma nova propriedade reativa, usaria:
      // Vue.set(product, 'editingPrice', true);
      product.editingPrice = !product.editingPrice;
    }
  }
};
</script>

<style scoped>
.product-table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}
.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.product-table th {
  background-color: #f2f2f2;
  color: #35495e;
}
.product-table td input[type="number"] {
  width: 80px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.product-table button {
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.product-table button:hover {
  background-color: #2980b9;
}
</style>