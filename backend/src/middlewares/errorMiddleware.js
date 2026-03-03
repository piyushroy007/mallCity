const httpStatus = require('http-status');
const config = require('../config/env');

// Not-found handler
const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Resource not found',
    path: req.originalUrl,
  });
};

// Central error handler
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  const response = {
    success: false,
    message,
  };

  if (config.isDev) {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(statusCode).json(response);
};

module.exports = {
  notFound,
  errorHandler,
};

