<template>
    <v-container>
        <p class="text-body-1">
            Este exercício demonstra a customização de botões Vuetify usando **SCSS**.
            Verifique o arquivo `src/styles/variables.scss` para a implementação.
        </p>

        <v-btn color="primary" class="ma-2">
            Botão Primário Customizado
        </v-btn>

        <v-btn color="secondary" class="ma-2">
            Botão Secundário Customizado
        </v-btn>

        <v-btn color="error" class="ma-2">
            Botão de Erro Customizado
        </v-btn>
    </v-container>
</template>

<script>
export default {
    name: 'Ex9',
};
</script>
