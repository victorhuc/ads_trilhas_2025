const jwt = require('jsonwebtoken');
const SEGREDO_JWT = 'secreto123'; // Deve ser igual ao usado no login

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, SEGREDO_JWT, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }

    req.usuario = usuario; // armazena dados do usuário no request
    next();
  });
}

module.exports = autenticarToken;
