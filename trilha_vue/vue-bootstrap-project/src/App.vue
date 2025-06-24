Com certeza\! Abaixo está o código completo do arquivo `src/App.vue`, incluindo todas as questões que implementamos usando **Vue.js** e **Bootstrap**.

-----

## `src/App.vue` Completo

```vue
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Meu Projeto Vue + Bootstrap</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Serviços</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contato</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container mt-5 mb-5 pt-4">
      <h2 class="my-4">1. Layout Básico com Grid</h2>
      <div class="row">
        <div class="col-12 col-lg-3">
          <div class="p-3 mb-2 bg-light border">Coluna 1 (3/12 em LG+)</div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="p-3 mb-2 bg-light border">Coluna 2 (6/12 em LG+)</div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="p-3 mb-2 bg-light border">Coluna 3 (3/12 em LG+)</div>
        </div>
      </div>
      <hr>

      <h2 class="my-4">3. Botão com Cor Dinâmica</h2>
      <div class="row">
        <div class="col-12">
          <button
            :class="['btn', currentBtnClass]"
            @click="toggleButtonColor"
          >
            Mudar Cor do Botão
          </button>
        </div>
      </div>
      <hr>

      <h2 class="my-4">4. Card com Imagem e Ação</h2>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="card">
            <img src="https://via.placeholder.com/286x180/007bff/ffffff?text=Imagem" class="card-img-top" alt="Imagem do Card">
            <div class="card-body">
              <h5 class="card-title">Título do Meu Card</h5>
              <p class="card-text">Este é o corpo do meu cartão. Aqui posso adicionar mais informações ou conteúdo relevante.</p>
              <button class="btn btn-info" @click="showCardAlert">
                Ação do Card
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr>

      <h2 class="my-4">6. Modal Bootstrap</h2>
      <div class="row">
        <div class="col-12">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myBootstrapModal">
            Abrir Modal
          </button>

          <div class="modal fade" id="myBootstrapModal" tabindex="-1" aria-labelledby="myBootstrapModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="myBootstrapModalLabel">Título do Meu Modal</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Esta é uma mensagem importante dentro do meu modal.
                  Você pode colocar qualquer conteúdo aqui.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary">Salvar mudanças</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>

      <h2 class="my-4">7. Formulário com Validação</h2>
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <div class="card p-4">
            <h5 class="card-title mb-4">Formulário de Contato</h5>
            <form @submit.prevent="submitForm" class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="inputName" class="form-label">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{'is-invalid': nameInvalid, 'is-valid': nameTouched && !nameInvalid}"
                  id="inputName"
                  v-model="name"
                  @blur="nameTouched = true"
                  required
                >
                <div class="invalid-feedback">
                  Por favor, digite seu nome.
                </div>
              </div>
              <div class="mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': emailInvalid, 'is-valid': emailTouched && !emailInvalid}"
                  id="inputEmail"
                  v-model="email"
                  @blur="emailTouched = true"
                  required
                >
                <div class="invalid-feedback">
                  Por favor, digite um e-mail válido.
                </div>
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Senha</label>
                <input
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': passwordInvalid, 'is-valid': passwordTouched && !passwordInvalid}"
                  id="inputPassword"
                  v-model="password"
                  @blur="passwordTouched = true"
                  required
                  minlength="6"
                >
                <div class="invalid-feedback">
                  A senha deve ter pelo menos 6 caracteres.
                </div>
              </div>
              <button type="submit" class="btn btn-success">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <hr>

      <h2 class="my-4">10. Sistema de Abas (Tabs)</h2>
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ 'active': activeTab === 'home' }"
                @click="activeTab = 'home'"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ 'active': activeTab === 'profile' }"
                @click="activeTab = 'profile'"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Perfil
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ 'active': activeTab === 'contact' }"
                @click="activeTab = 'contact'"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Contato
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade p-3" :class="{ 'show active': activeTab === 'home' }" role="tabpanel" aria-labelledby="home-tab">
              <h3>Conteúdo da Aba Home</h3>
              <p>Bem-vindo à página inicial. Este é o conteúdo da primeira aba.</p>
            </div>
            <div class="tab-pane fade p-3" :class="{ 'show active': activeTab === 'profile' }" role="tabpanel" aria-labelledby="profile-tab">
              <h3>Conteúdo da Aba Perfil</h3>
              <p>Informações do seu perfil pessoal. Você pode editar seus dados aqui.</p>
            </div>
            <div class="tab-pane fade p-3" :class="{ 'show active': activeTab === 'contact' }" role="tabpanel" aria-labelledby="contact-tab">
              <h3>Conteúdo da Aba Contato</h3>
              <p>Entre em contato conosco. Preencha o formulário abaixo para enviar uma mensagem.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer fixed-bottom bg-dark text-white text-center py-3">
      <div class="container">
        &copy; {{ new Date().getFullYear() }} Meu Projeto Vue + Bootstrap. Todos os direitos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Questão 3: Botão Dinâmico
const isPrimary = ref(true);
const currentBtnClass = ref('btn-primary');
const toggleButtonColor = () => {
  isPrimary.value = !isPrimary.value;
  currentBtnClass.value = isPrimary.value ? 'btn-primary' : 'btn-success';
  console.log('Cor do botão alterada para:', currentBtnClass.value);
};

// Questão 4: Card com Alerta
const showCardAlert = () => {
  alert('Botão "Ação do Card" foi pressionado!');
};

// Questão 7: Formulário com Validação
const name = ref('');
const email = ref('');
const password = ref('');

const nameTouched = ref(false);
const emailTouched = ref(false);
const passwordTouched = ref(false);

const nameInvalid = computed(() => nameTouched.value && name.value.trim() === '');
const emailInvalid = computed(() => emailTouched.value && (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)));
const passwordInvalid = computed(() => passwordTouched.value && (password.value.length < 6));

const submitForm = (event) => {
  nameTouched.value = true;
  emailTouched.value = true;
  passwordTouched.value = true;

  if (nameInvalid.value || emailInvalid.value || passwordInvalid.value) {
    event.target.classList.add('was-validated');
    alert('Por favor, preencha todos os campos corretamente.');
  } else {
    event.target.classList.remove('was-validated');
    alert('Formulário enviado com sucesso!');
    console.log('Dados do formulário:', {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    // Limpar formulário ou redirecionar
    name.value = '';
    email.value = '';
    password.value = '';
    nameTouched.value = false;
    emailTouched.value = false;
    passwordTouched.value = false;
  }
};

const activeTab = ref('home'); 
</script>

<style>

body {
  padding-top: 56px; /* Altura aproximada da navbar */
  padding-bottom: 56px; /* Altura aproximada do rodapé */
}
.footer {
  width: 100%;
}
</style>
