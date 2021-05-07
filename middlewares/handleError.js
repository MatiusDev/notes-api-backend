const ERROR_HANDLERS = {
  CastError: res => res.status(400).end(),
  ValidatorError: (res, type) => {
    if (type === 'USER_UNIQUE') {
      return res.status(500).json({
        ok: false,
        error: 'El nombre de usuario ya existe.'
      });
    }
    return res.status(500).end();
  },
  JsonWebTokenError: res => res.status(401).end(),
  DefaultError: res => res.status(500).end()
};

const handleError = (error, req, res, next) => {
  const { name, type } = error;
  const handler = ERROR_HANDLERS[name] || ERROR_HANDLERS.DefaultError;
  handler(res, type);
};

module.exports = handleError;