// controllers/userController.js
const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  const users = await userModel.getAll();
  res.json(users);
};

// controllers/userController.js
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const result = await userModel.create({ name, email });
  res.status(201).json(result);
};

// controllers/userController.js
exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const users = await userModel.getAllWithPagination(limit, offset);
  res.json(users);
};

// controllers/userController.js
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  await userModel.update(id, { name, email });
  res.sendStatus(204);
};

// controllers/userController.js
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await userModel.delete(id);
  res.sendStatus(204);
};

// controllers/userController.js
exports.searchByName = async (req, res) => {
  const { name } = req.query;
  const users = await userModel.searchByName(name);
  res.json(users);
};
