const Joi = require('joi');

const gizmoSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string()
});

module.exports = gizmoSchema;
