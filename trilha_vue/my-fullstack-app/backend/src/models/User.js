const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs'); // Para fazer hash da senha

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante que cada email seja único
    validate: {
      isEmail: true, // Valida se o formato é de email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Hooks são funções que são executadas em momentos específicos do ciclo de vida do modelo
  hooks: {
    // Antes de criar um novo usuário, faz o hash da senha
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); // Gera um "sal" para o hash
        user.password = await bcrypt.hash(user.password, salt); // Gera o hash da senha
      }
    },
    // Antes de atualizar um usuário, verifica se a senha foi alterada e faz o hash novamente
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  timestamps: true, // Adiciona campos `createdAt` e `updatedAt` automaticamente
});

// Adiciona um método de instância ao modelo User para comparar senhas
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;