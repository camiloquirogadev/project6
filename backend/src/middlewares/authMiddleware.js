const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'supersecreto';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      clientId: decoded.clientId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
