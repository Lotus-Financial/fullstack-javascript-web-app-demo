
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
      super(`${resource} with id ${id} was not found.`);

      this.statusCode = 404;
      this.status = 'fail';
      this.name = this.constructor.name;

      Error.captureStackTrace(this, this.constructor);

  }
}

module.exports = {
  InvalidRouteError,
  NotFoundError
};
