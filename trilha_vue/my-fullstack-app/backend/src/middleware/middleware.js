const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho 'x-auth-token'
  const token = req.header('x-auth-token');

  // Se não houver token, retorna erro 401 (Não Autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adiciona as informações do usuário (payload do token) ao objeto `req`
    req.user = decoded.user;
    next(); // Continua para a próxima função middleware ou rota
  } catch (err) {
    // Se o token for inválido, retorna erro 401
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;