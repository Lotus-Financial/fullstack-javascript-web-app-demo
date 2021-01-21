class RequestValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
    this.status = 'fail';
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class RequestIdValidationError extends RequestValidationError {
  constructor(resource, id) {
    super(`Invalid id ${id} provided for resource: ${resource}.`)
  }
}

class RequestResourceValidationError extends RequestValidationError {
  constructor(resource, message) {
    super(`Invalid data provided for resource: ${resource}. Validation error: ${message}.`)
  }
}

class InvalidRouteError extends Error {
  constructor(method, route) {
    super(`Cannot ${method} ${route} on this server!`)

    this.statusCode = 404;
    this.status = 'fail';
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends Error {
  constructor(resource, id){
      super(`Resource: ${resource} with id ${id} was not found.`);

      this.statusCode = 404;
      this.status = 'fail';
      this.name = this.constructor.name;

      Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  RequestIdValidationError,
  RequestResourceValidationError,
  InvalidRouteError,
  NotFoundError
};
