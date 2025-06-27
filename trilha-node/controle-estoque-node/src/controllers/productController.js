const productModel = require('../models/productModel');
const stockMovementModel = require('../models/stockMovementModel');

/**
 * Cria um novo produto.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function createProduct(req, res) {
    const { name, quantity, price, category } = req.body;

    if (!name || quantity === undefined || price === undefined) {
        return res.status(400).json({ message: 'Nome, quantidade e preço são obrigatórios.' });
    }
    if (quantity < 0 || price < 0) {
        return res.status(400).json({ message: 'Quantidade e preço não podem ser negativos.' });
    }

    try {
        const existingProduct = await productModel.getProductByName(name);
        if (existingProduct) {
            return res.status(409).json({ message: 'Já existe um produto com este nome.' });
        }

        const newProduct = await productModel.createProduct({ name, quantity, price, category });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Lista todos os produtos.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Busca um produto por ID.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Atualiza um produto.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, category } = req.body; // Quantidade é atualizada via entrada/saída

    if (!name || price === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios para atualização.' });
    }
    if (price < 0) {
        return res.status(400).json({ message: 'Preço não pode ser negativo.' });
    }

    try {
        const updated = await productModel.updateProduct(id, { name, price, category });
        if (!updated) {
            return res.status(404).json({ message: 'Produto não encontrado ou nenhum dado para atualizar.' });
        }
        const updatedProduct = await productModel.getProductById(id);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Deleta um produto.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const deleted = await productModel.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Registra uma entrada de estoque para um produto.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function productStockEntry(req, res) {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // ID do usuário logado via JWT

    if (quantity === undefined || quantity <= 0) {
        return res.status(400).json({ message: 'Quantidade para entrada deve ser um número positivo.' });
    }

    try {
        const product = await productModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        const newQuantity = product.quantity + quantity;
        await productModel.updateProductQuantity(productId, newQuantity);
        await stockMovementModel.createStockMovement({
            product_id: productId,
            user_id: userId,
            type: 'IN',
            quantity_moved: quantity
        });

        res.status(200).json({ message: 'Entrada de estoque registrada com sucesso.', newQuantity: newQuantity });
    } catch (error) {
        console.error('Erro ao registrar entrada de estoque:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Registra uma saída de estoque para um produto.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function productStockExit(req, res) {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // ID do usuário logado via JWT

    if (quantity === undefined || quantity <= 0) {
        return res.status(400).json({ message: 'Quantidade para saída deve ser um número positivo.' });
    }

    try {
        const product = await productModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Estoque insuficiente para esta saída.' });
        }

        const newQuantity = product.quantity - quantity;
        await productModel.updateProductQuantity(productId, newQuantity);
        await stockMovementModel.createStockMovement({
            product_id: productId,
            user_id: userId,
            type: 'OUT',
            quantity_moved: quantity
        });

        res.status(200).json({ message: 'Saída de estoque registrada com sucesso.', newQuantity: newQuantity });
    } catch (error) {
        console.error('Erro ao registrar saída de estoque:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    productStockEntry,
    productStockExit
};