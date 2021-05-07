const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET_SEED, (err, token) => {
      if (err) {
        reject('Error al intentar generar el token.')
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateToken
};