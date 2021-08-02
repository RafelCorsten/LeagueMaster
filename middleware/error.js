const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if ( err.code === 11000 ) {
    error = new ErrorResponse('Duplicate entry', 400);
  }

  if (err.name === 'ValidationError') {
    error = new ErrorResponse(Object.values(err.errors).map(val => val.message), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;