const customErrors = require('../helpers/errors/customErrors');

module.exports = (req, res, next) => {
  next(new customErrors.InvalidRouteError(req.method, req.originalUrl));
};
