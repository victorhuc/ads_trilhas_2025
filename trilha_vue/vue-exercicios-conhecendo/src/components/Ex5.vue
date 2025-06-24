<template>
  <div>
    <h2>Exercício 5: Formulário Dinâmico</h2>
    <form class="dynamic-form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="formData.name" />
      </div>

      <div class="form-group">
        <label>Gênero:</label>
        <div>
          <input type="radio" id="male" value="Masculino" v-model="formData.gender" />
          <label for="male">Masculino</label>
          <input type="radio" id="female" value="Feminino" v-model="formData.gender" />
          <label for="female">Feminino</label>
          <input type="radio" id="other" value="Outro" v-model="formData.gender" />
          <label for="other">Outro</label>
        </div>
      </div>

      <div class="form-group">
        <label>Interesses:</label>
        <div>
          <input type="checkbox" id="coding" value="Programação" v-model="formData.interests" />
          <label for="coding">Programação</label>
          <input type="checkbox" id="design" value="Design" v-model="formData.interests" />
          <label for="design">Design</label>
          <input type="checkbox" id="sports" value="Esportes" v-model="formData.interests" />
          <label for="sports">Esportes</label>
        </div>
      </div>

      <div class="form-group">
        <label for="city">Cidade:</label>
        <select id="city" v-model="formData.city">
          <option value="">Selecione uma cidade</option>
          <option value="Sao Paulo">São Paulo</option>
          <option value="Rio de Janeiro">Rio de Janeiro</option>
          <option value="Belo Horizonte">Belo Horizonte</option>
          <option value="Joinville">Joinville</option>
        </select>
      </div>
    </form>

    <hr />

    <h3>Dados Preenchidos em Tempo Real:</h3>
    <div class="output-data">
      <p><strong>Nome:</strong> {{ formData.name || 'N/A' }}</p>
      <p><strong>Gênero:</strong> {{ formData.gender || 'N/A' }}</p>
      <p><strong>Interesses:</strong> {{ formData.interests.length ? formData.interests.join(', ') : 'N/A' }}</p>
      <p><strong>Cidade:</strong> {{ formData.city || 'N/A' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ex5',
  data() {
    return {
      formData: {
        name: '',
        gender: '',
        interests: [],
        city: ''
      }
    };
  }
};
</script>

<style scoped>
.dynamic-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input[type="text"],
.form-group input[type="email"],
.form-group select {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-group input[type="radio"],
.form-group input[type="checkbox"] {
  margin-right: 5px;
}
.form-group div label {
  display: inline-block;
  margin-right: 15px;
  font-weight: normal;
}
hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 40px 0;
}
.output-data {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #f9f9f9;
}
.output-data p {
  margin-bottom: 5px;
}
</style>