const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authorization = req.get('authorization');
  if (!(authorization && authorization.toLocaleLowerCase().startsWith('bearer'))) {
    return res.status(400).json({
      error: 'Autorización'
    });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(400).json({
      error: 'Necesitas el token.'
    });
  }

  try {
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET_SEED);
    req.user = { id, username };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: 'El token no es válido.'
    });
  }

  next();
};

module.exports = verifyToken;