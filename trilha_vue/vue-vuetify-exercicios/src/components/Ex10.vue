<template>
    <v-container>
        <v-data-table :headers="headers" :items="users" :loading="loading" item-key="id" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Usuários da API Externa</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="fetchUsers">
                        Recarregar Dados
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:no-data>
                <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                <span v-else>Nenhum dado disponível. Clique em "Recarregar Dados".</span>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Ex10',
    data() {
        return {
            loading: true,
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Cidade', value: 'address.city' },
                { text: 'Telefone', value: 'phone' },
            ],
            users: [],
        };
    },
    created() {
        this.fetchUsers(); // Carrega os dados da API ao criar o componente
    },
    methods: {
        async fetchUsers() {
            this.loading = true;
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                this.users = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                alert('Não foi possível carregar os dados da API. Verifique o console para mais detalhes.');
                this.users = []; // Limpa os dados em caso de erro
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
