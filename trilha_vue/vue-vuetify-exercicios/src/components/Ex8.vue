<template>
    <v-container>
        <p class="text-body-1">
            Este exercício demonstra um **tema customizado** do Vuetify.
            A cor **primária** foi alterada para **verde** e a **secundária** para **amarelo** no arquivo
            `src/plugins/vuetify.js`.
        </p>

        <v-btn color="primary" class="my-2">
            Botão Primário (Verde)
        </v-btn>
        <v-btn color="secondary" class="my-2 ml-4">
            Botão Secundário (Amarelo)
        </v-btn>

        <v-card class="my-5 pa-3" color="primary" dark>
            <v-card-title>Card com Cor Primária</v-card-title>
            <v-card-text>Este card usa a cor primária do tema.</v-card-text>
        </v-card>

        <v-alert type="warning" color="secondary" text icon="mdi-information-outline">
            Este é um alerta usando a cor secundária.
        </v-alert>
    </v-container>
</template>

<script>
export default {
    name: 'Ex8',
};
</script>
