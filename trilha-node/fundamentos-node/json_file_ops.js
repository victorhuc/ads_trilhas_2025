const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'config.json');

// 1. Objeto JavaScript para ser salvo como JSON
const configData = {
  appName: 'Minha Aplicação Node.js',
  version: '1.0.0',
  settings: {
    darkMode: true,
    language: 'pt-BR'
  },
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
};

// 2. Salvar o objeto JavaScript como um arquivo JSON
// JSON.stringify converte o objeto JS em uma string JSON
// O 'null, 2' é para formatar o JSON com indentação de 2 espaços, tornando-o legível.
fs.writeFile(jsonFilePath, JSON.stringify(configData, null, 2), 'utf8', (err) => {
  if (err) {
    console.error('Erro ao escrever arquivo JSON:', err);
    return;
  }
  console.log('Arquivo "config.json" criado e escrito com sucesso.');

  // 3. Ler o arquivo JSON
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler arquivo JSON:', err);
      return;
    }
    console.log('Conteúdo RAW do arquivo JSON:');
    console.log(data);

    try {
      // 4. Parsear a string JSON para um objeto JavaScript
      const parsedConfig = JSON.parse(data);
      console.log('\nConteúdo PARSEADO do arquivo JSON:');
      console.log('Nome da Aplicação:', parsedConfig.appName);
      console.log('Versão:', parsedConfig.version);
      console.log('Modo Escuro:', parsedConfig.settings.darkMode);
      console.log('Primeiro Usuário:', parsedConfig.users[0].name);
    } catch (parseErr) {
      console.error('Erro ao fazer parse do JSON:', parseErr);
    }
  });
});

