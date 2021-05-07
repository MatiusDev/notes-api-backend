const handleError = (error, req, res, next) => {
  const { name, type } = error;

  switch (name) {
  case 'CastError':
    return res.status(400).end();
  case 'ValidatorError':
    if (type == 'USER_UNIQUE') {
      return res.status(500).json({
        ok: false,
        error: 'El nombre de usuario ya existe.'
      });
    }
    return res.status(500).end();
  default:
    res.status(500).end();
  }
  res.status(500).end();
};

module.exports = handleError;