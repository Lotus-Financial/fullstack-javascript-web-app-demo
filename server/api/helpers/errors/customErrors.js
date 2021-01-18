
class NotFoundError extends Error {
  constructor(resource, id){
      super(`${resource} with id ${id} was not found.`);

      this.name = this.constructor.name

      Error.captureStackTrace(this, this.constructor);

  }
}

module.exports = {
  NotFoundError
};
