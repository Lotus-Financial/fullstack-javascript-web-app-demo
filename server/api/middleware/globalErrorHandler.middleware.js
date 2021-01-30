module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  console.error(`Global error handler invoked:\n  Error message: ${err.message}\n  Stacktrace: ${err.stack}`)

  res.status(err.statusCode).json({
    status: err.status,
    message: 'Internal Server Error'
  });
}
