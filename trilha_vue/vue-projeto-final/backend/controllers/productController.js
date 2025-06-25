const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

exports.create = async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch {
    res.status(400).json({ error: 'Erro ao criar produto' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    await db.Product.update(req.body, { where: { id } });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch {
    res.status(400).json({ error: 'Erro ao atualizar produto' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await db.Product.destroy({ where: { id } });
    res.json({ message: 'Produto excluído com sucesso' });
  } catch {
    res.status(400).json({ error: 'Erro ao excluir produto' });
  }
};
