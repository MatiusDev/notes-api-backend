const handleError = (error, req, res, next) => {
  console.error(error);
  console.log(error.name);
  if (error.name === 'CastError') {
    res.status(400).end();
  }
  res.status(500).end();
};

module.exports = handleError;