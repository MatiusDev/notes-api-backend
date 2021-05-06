const handleError = (error, req, res, next) => {
  const { name, type } = error;

  switch (name) {
  case 'CastError':
    return res.status(400).end();
  case 'ValidationError':
    if (type == 'USER_UNIQUE') {
      return res.status(500).json({ error: 'El nombre de usuario ya existe.' });
    }
    return res.status(500).end();
  default:
    res.status(500).end();
  }
};

module.exports = handleError;