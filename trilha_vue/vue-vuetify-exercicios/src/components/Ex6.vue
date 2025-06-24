<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="products"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
          <v-toolbar flat>
<v-toolbar-title>Lista de Produtos (Estática)</v-toolbar-title>
<v-divider class="mx-4" inset vertical></v-divider>
<v-spacer></v-spacer>
</v-toolbar>
</template>
</v-data-table>
</v-container>
</template>

<script>
export default {
  name: 'Ex6',
  data() {
    return {
      headers: [
        { text: 'Nome do Produto', align: 'start', sortable: false, value: 'name' },
        { text: 'Preço (R$)', value: 'price' },
        { text: 'Estoque', value: 'stock' },
      ],
      products: [
        { name: 'Monitor LED 24"', price: 899.90, stock: 50 },
        { name: 'Teclado Mecânico', price: 250.00, stock: 120 },
        { name: 'Mouse Gamer', price: 120.50, stock: 80 },
        { name: 'Webcam Full HD', price: 180.00, stock: 30 },
        { name: 'Fone de Ouvido Bluetooth', price: 320.00, stock: 65 },
      ],
    };
  },
};
</script>

