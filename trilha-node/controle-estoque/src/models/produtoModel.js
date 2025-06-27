const db = require('../config/db');

// Função para criar um novo produto
const criarProduto = (nome, quantidade, preco, categoria, callback) => {
    const query = `INSERT INTO produtos (nome, quantidade, preco, categoria) VALUES (?, ?, ?, ?)`;
    db.query(query, [nome, quantidade, preco, categoria], (err, results) => {
        if (err) {
            return callback(err, null); 
        }
        callback(null, results); 
    });
};

// Função para buscar todos os produtos
const listarProdutos = (callback) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para buscar um produto pelo ID
const buscarProdutoPorId = (id, callback) => {
    const query = 'SELECT * FROM produtos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Verifica se o produto foi encontrado
        if (results.length === 0) {
            return callback(null, null);  // Produto não encontrado
        }
        callback(null, results[0]);  // Retorna o produto
    });
};

// Função para atualizar um produto
const atualizarProduto = (id, nome, quantidade, preco, categoria, callback) => {
    const query = `UPDATE produtos SET nome = ?, quantidade = ?, preco = ?, categoria = ? WHERE id = ?`;
    db.query(query, [nome, quantidade, preco, categoria, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para excluir um produto
const excluirProduto = (id, callback) => {
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para registrar a entrada de um produto (aumenta a quantidade)
const registrarEntrada = (id, quantidade, callback) => {
    const query = `UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?`;
    db.query(query, [quantidade, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para registrar a saída de um produto (diminui a quantidade)
const registrarSaida = (id, quantidade, callback) => {
    const query = `UPDATE produtos SET quantidade = quantidade - ? WHERE id = ? AND quantidade >= ?`;
    db.query(query, [quantidade, id, quantidade], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback('Estoque insuficiente para realizar a saída', null);
        }
        callback(null, results);
    });
};

// Função para buscar produtos mais vendidos (estoque <= 5)
const produtosMaisVendidos = (callback) => {
    const query = `
        SELECT p.id, p.nome, p.quantidade, p.preco, p.categoria
        FROM produtos p
        WHERE p.quantidade <= 5
        ORDER BY p.quantidade ASC`;  // Ordem crescente para pegar os de menor estoque
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Função para buscar produtos com estoque baixo (menor ou igual a 5 unidades)
const estoqueBaixo = (callback) => {
    const query = `
        SELECT p.id, p.nome, p.quantidade, p.preco, p.categoria
        FROM produtos p
        WHERE p.quantidade <= 5
        ORDER BY p.quantidade ASC`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
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
