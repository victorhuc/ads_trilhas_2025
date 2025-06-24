// models/Usuario.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;

const bcrypt = require('bcryptjs');

Usuario.beforeCreate(async (usuario) => {
  usuario.senha = await bcrypt.hash(usuario.senha, 10);
});

Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('senha')) {
    usuario.senha = await bcrypt.hash(usuario.senha, 10);
  }
});
