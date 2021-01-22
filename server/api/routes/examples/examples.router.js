const express = require('express');

const examplesController = require('../../controllers/examples/examples.controller');

const examplesRouter = express.Router();

const asyncHandler = require('../../helpers/asyncHandler.helper');

const { isPositiveInteger } = require('../../helpers/validators/numeric.validator');
const gizmoSchema = require('../../schemas/gizmo.schema');
const customErrors = require('../../helpers/errors/customErrors');

const listGizmosGET = async (req, res) => {
    const gizmos = await examplesController.listGizmos();
    res.status(200).send(gizmos);
};

const retrieveGizmoGET = async (req, res) => {
  const gizmoId = req.params?.id;
  if (!isPositiveInteger(gizmoId)) {
    throw new customErrors.RequestIdValidationError('gizmo', gizmoId);
  }

  const retrievedGizmo = await examplesController.retrieveGizmo(gizmoId);
  res.status(200).send(retrievedGizmo);
}

const createGizmoPOST = async (req, res) => {
  const gizmoToCreate = req.body?.data; 
  const gizmoValidation = gizmoSchema.validate(gizmoToCreate);
  if (gizmoValidation.error) {
    throw new customErrors.RequestResourceValidationError('gizmo', gizmoValidation.error.message);
  }

  const createdGizmo = await examplesController.createGizmo(req.body?.data);
  res.status(201).send(createdGizmo);
}

const updateGizmoPUT = async (req, res) => {
  const updatedGizmo = await examplesController.updateGizmo(req.body?.data);
  res.status(200).send(updatedGizmo);
}

const deleteGizmoDELETE = async (req, res) => {
  const deletedGizmo = await examplesController.deleteGizmo(req.params?.id);
  res.status(200).send(deletedGizmo);
}

examplesRouter.get('/gizmos', asyncHandler(listGizmosGET));
examplesRouter.get('/gizmo/:id', asyncHandler(retrieveGizmoGET));
examplesRouter.post('/gizmo', asyncHandler(createGizmoPOST));
examplesRouter.put('/gizmo', asyncHandler(updateGizmoPUT));
examplesRouter.delete('/gizmo/:id', asyncHandler(deleteGizmoDELETE));

module.exports = {
  router: examplesRouter,
  callbacks: {
    listGizmosGET,
    retrieveGizmoGET,
    createGizmoPOST,
    updateGizmoPUT,
    deleteGizmoDELETE
  }
};
