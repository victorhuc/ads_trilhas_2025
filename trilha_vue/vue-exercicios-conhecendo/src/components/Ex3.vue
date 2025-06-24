<template>
  <div>
    <h2>Exercício 3: Lista de Tarefas</h2>
    <div class="task-input">
      <input type="text" v-model="newTask" @keyup.enter="addTask" placeholder="Nova tarefa" />
      <button @click="addTask">Adicionar</button>
    </div>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="removeTask(index)">Remover</button>
      </li>
    </ul>
    <p v-if="tasks.length === 0">Nenhuma tarefa no momento.</p>
  </div>
</template>

<script>
export default {
  name: 'Ex3',
  data() {
    return {
      newTask: '',
      tasks: ['Estudar Vue.js', 'Fazer compras', 'Lavar o carro']
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push(this.newTask.trim());
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.task-input input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
}
.task-input button {
  background-color: #f44336;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.task-input button:hover {
  background-color: #da190b;
}
.task-list {
  list-style: none;
  padding: 0;
  max-width: 400px;
  margin: 20px auto;
}
.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.task-list li button {
  background-color: #888;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.task-list li button:hover {
    background-color: #555;
}
</style>