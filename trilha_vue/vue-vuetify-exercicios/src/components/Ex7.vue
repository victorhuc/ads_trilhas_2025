<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="400">
      <v-card-title class="text-h5 text-center mb-4">Login</v-card-title>
      <v-form ref="loginForm" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required
          prepend-inner-icon="mdi-email"></v-text-field>

        <v-text-field v-model="password" :rules="passwordRules" label="Senha" type="password" required
          prepend-inner-icon="mdi-lock"></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="submitLogin">
          Entrar
        </v-btn>

        <v-btn color="error" class="mt-4" @click="resetForm">
          Limpar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Ex7',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+..+/.test(v) || 'E-mail deve ser válido',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Senha é obrigatória',
      v => (v && v.length >= 6) || 'A senha deve ter pelo menos 6 caracteres',
    ],
  }),
  methods: {
    async submitLogin() {
      const { valid } = await this.$refs.loginForm.validate();
      if (valid) {
        alert(Login efetuado! E - mail: ${ this.email }, Senha: ${ this.password });
        console.log('Dados de login:', { email: this.email, password: this.password });
        this.resetForm();
      } else {
        alert('Por favor, preencha corretamente os campos de login.');
      }
    },
    resetForm() {
      this.$refs.loginForm.reset();
    },
  },
};
</script>
