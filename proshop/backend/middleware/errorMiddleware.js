export function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  console.log(res.statusCode);
  console.log(error);
  res.status(400);
  next(error);
  //This function doesn't end the request-response cycle. That's why it must invoke next() function
  //otherwise the request will be hanging or pending.
  //To end the request-response cycle you must call functions json(), end(), send() on res object
  //res.end(), res.send(), res.json()
}

export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let { message, name, kind, stack } = err;

  console.log({ name, kind, statusCode });
  if (name === 'CastError' && kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🙃' : stack,
  });
  //We don't call next() here because we want to end
  //the request-response cycle by sending an appropriate response
  //to the client when an error occurs.
}
