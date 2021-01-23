const Joi = require('joi');

const gizmoCreateSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required()
});

const gizmoUpdateSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required()
});

module.exports = {
  create: gizmoCreateSchema,
  update: gizmoUpdateSchema
};
