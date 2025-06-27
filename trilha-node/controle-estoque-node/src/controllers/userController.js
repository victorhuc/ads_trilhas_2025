const userModel = require('../models/userModel');

/**
 * Cria um novo usuário.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function createUser(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos (name, email, password, role) são obrigatórios.' });
    }
    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'O papel (role) deve ser "admin" ou "user".' });
    }

    try {
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        const newUser = await userModel.createUser({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Lista todos os usuários.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Busca um usuário por ID.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Atualiza um usuário.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: 'Nome, email e papel são obrigatórios para atualização.' });
    }
    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'O papel (role) deve ser "admin" ou "user".' });
    }

    try {
        const updated = await userModel.updateUser(id, { name, email, password, role });
        if (!updated) {
            return res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado para atualizar.' });
        }
        // Retorna o usuário atualizado (sem a senha)
        const updatedUser = await userModel.getUserById(id);
        res.json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

/**
 * Deleta um usuário.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 */
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deleted = await userModel.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};