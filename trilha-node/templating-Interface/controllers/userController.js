const pool = require('../config/db');

// Exibir formulário de cadastro de usuário
exports.showUserForm = (req, res) => {
  res.render('index', {
    pageTitle: 'Cadastrar Usuário',
    errors: req.query.errors ? JSON.parse(req.query.errors) : [],
    oldData: req.query.oldData ? JSON.parse(req.query.oldData) : {}
  });
};

// 5. Configura uma rota POST que receba os dados do formulário e insira no MySQL.
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const errors = [];

  // 10. Valida os campos de entrada do formulário e exiba mensagens de erro caso os dados sejam inválidos.
  if (!name || name.trim() === '') {
    errors.push('O nome é obrigatório.');
  }
  if (!email || email.trim() === '') {
    errors.push('O email é obrigatório.');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Formato de email inválido.');
  }

  if (errors.length > 0) {
    // Redireciona de volta ao formulário com os erros e os dados preenchidos
    return res.redirect(`/users/add?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(req.body)}`);
  }

  try {
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.redirect('/users?success=true'); // Redireciona para a lista com mensagem de sucesso
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      errors.push('Este email já está cadastrado.');
      return res.redirect(`/users/add?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(req.body)}`);
    }
    // 6. Crie um template que exiba mensagens de erro ao processar dados.
    res.render('error', {
      pageTitle: 'Erro',
      message: 'Erro ao cadastrar usuário.',
      details: error.message
    });
  }
};

// 2. Implementa um template que liste usuários cadastrados em um banco MySQL.
exports.listUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.render('users', {
      pageTitle: 'Lista de Usuários',
      users: rows,
      successMessage: req.query.success ? 'Usuário cadastrado com sucesso!' : null
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.render('error', {
      pageTitle: 'Erro',
      message: 'Erro ao carregar lista de usuários.',
      details: error.message
    });
  }
};

// 9. Integre dados do MySQL em um menu dinâmico renderizado via EJS.
exports.getDynamicMenuData = async () => {
  try {
    const [rows] = await pool.query('SELECT name FROM users LIMIT 5'); // Exemplo: últimos 5 usuários no menu
    return rows;
  } catch (error) {
    console.error('Erro ao buscar dados para o menu dinâmico:', error);
    return [];
  }
};