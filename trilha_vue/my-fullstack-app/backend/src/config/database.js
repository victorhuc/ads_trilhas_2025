require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Opcional: define para 'true' para ver logs SQL no console
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '-03:00' // Fuso horário de Joinville (GMT-3)
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');

    // Sincroniza todos os modelos definidos com o banco de dados.
    // Isso criará as tabelas se elas não existirem ou aplicará alterações.
    await sequelize.sync({ alter: true });
    console.log('🔄 Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
    // Em caso de falha na conexão, encerra o processo da aplicação
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };