
const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar o token JWT.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 * @param {function} next - Próximo middleware.
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Token de autenticação ausente.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = user; // Adiciona as informações do usuário (id, role) à requisição
        next();
    });
}

/**
 * Middleware para verificar o papel do usuário.
 * @param {Array<string>} roles - Array de papéis permitidos (ex: ['admin', 'user']).
 * @returns {function} O middleware de autorização.
 */
function authorizeRoles(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso negado: você não tem permissão para esta ação.' });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};