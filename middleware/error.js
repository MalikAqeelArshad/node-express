const errorHandler = (err, req, res, next) => {
  const error = { error: true, msg: err.message };
  res.status(err.status ?? 500).json(error);
};

const notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

export {
  notFound,
  errorHandler,
};
