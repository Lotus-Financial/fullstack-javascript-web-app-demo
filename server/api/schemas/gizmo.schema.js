const Joi = require('joi');

const gizmoSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string()
});

module.exports = gizmoSchema;
