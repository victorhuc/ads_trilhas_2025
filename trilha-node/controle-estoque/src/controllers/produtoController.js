const Produto = require('../models/produtoModel');


// Criar Produto
const criarProduto = (req, res) => {
    const { nome, quantidade, preco, categoria } = req.body;

    Produto.criarProduto(nome, quantidade, preco, categoria, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar produto', error: err });
        }
        res.status(201).json({ message: 'Produto criado com sucesso!', data: result });
    });
};

// Listar Produtos
const listarProdutos = (req, res) => {
    Produto.listarProdutos((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao listar produtos', error: err });
        }
        res.status(200).json(result);
    });
};

// Buscar Produto por ID
const buscarProdutoPorId = (req, res) => {
    const { id } = req.params;
    Produto.buscarProdutoPorId(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar produto', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(result);
    });
};

// Atualizar Produto
const atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, preco, categoria } = req.body;

    Produto.atualizarProduto(id, nome, quantidade, preco, categoria, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar produto', error: err });
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso!', data: result });
    });
};

// Excluir Produto
const excluirProduto = (req, res) => {
    const { id } = req.params;
    Produto.excluirProduto(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir produto', error: err });
        }
        res.status(200).json({ message: 'Produto excluído com sucesso!' });
    });
};


// Registrar Entrada de Produto
const registrarEntrada = (req, res) => {
    const { id, quantidade } = req.body;

    Produto.registrarEntrada(id, quantidade, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao registrar entrada', error: err });
        }
        res.status(200).json({ message: 'Entrada registrada com sucesso!', data: result });
    });
};

// Registrar Saída de Produto
const registrarSaida = (req, res) => {
    const { id, quantidade } = req.body;

    Produto.registrarSaida(id, quantidade, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao registrar saída', error: err });
        }
        res.status(200).json({ message: 'Saída registrada com sucesso!', data: result });
    });
};

const produtosMaisVendidos = (req, res) => {
    Produto.produtosMaisVendidos((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar produtos mais vendidos', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(result);
    });
};

// Relatório de Estoque Baixo
const estoqueBaixo = (req, res) => {
    Produto.estoqueBaixo((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar produtos com estoque baixo', error: err });
        }
        res.status(200).json(result);
    });
};

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    excluirProduto,
    registrarEntrada,
    registrarSaida,
    produtosMaisVendidos,
    estoqueBaixo,
};