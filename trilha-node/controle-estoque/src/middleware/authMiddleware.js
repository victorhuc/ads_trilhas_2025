const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado
const verificarAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Falha ao autenticar token', error: err });
        }
        req.user = decoded;
        next();
    });
};

// Middleware para verificar se o usuário é um admin
const verificarAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }
    next();
};

module.exports = {
    verificarAuth,
    verificarAdmin
};
