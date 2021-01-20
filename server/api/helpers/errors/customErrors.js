class InvalidIdError extends Error {
  constructor(resource, id) {
    super(`Invalid id ${id} for resource: ${resource}.`)

    this.statusCode = 422;
    this.status = 'fail';
    this.name = this.constructor.name;

    Error.captureStackTrace(this,  this.constructor);
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
  InvalidIdError,
  InvalidRouteError,
  NotFoundError
};
