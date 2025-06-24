<template>
  <v-container>
    <v-row justify="center">
      <v-btn color="primary" dark @click="dialog = true">
        Abrir Modal
      </v-btn>

      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Título do Modal
          </v-card-title>

          <v-card-text class="pt-4">
            Esta é a mensagem principal do seu modal.
            Ele foi ativado ao clicar no botão.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Ex4',
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

