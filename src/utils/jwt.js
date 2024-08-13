// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

module.exports = { signToken, verifyToken };
