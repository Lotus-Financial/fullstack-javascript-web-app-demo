const globalErrorHandlerMiddleware = require('./globalErrorHandler.middleware');
const invalidRouteMiddleware = require('./invalidRoute.middleware');

module.exports = {
  invalidRouteMiddleware,
  globalErrorHandlerMiddleware
};
