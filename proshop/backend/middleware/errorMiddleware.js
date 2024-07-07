export function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  next(error);
}

export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let { message, name, kind, stack } = err;

  if (name === 'CastError' && kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🙃' : stack,
  });
}
