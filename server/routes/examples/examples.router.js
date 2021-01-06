import express from 'express';

import examplesController from '../../controllers/examples/examples.controller.js';

const examplesRouter = express.Router();

export const listGizmosGET = (req, res) => {
  const gizmos = examplesController.listGizmos();
  res.status(200).send(gizmos);
}

export const retrieveGizmoGET = (req, res) => {
  const retrievedGizmo = examplesController.retrieveGizmo(req.params?.name);
  res.status(200).send(retrievedGizmo);
}

export const createGizmoPOST = (req, res) => {
  const createdGizmo = examplesController.createGizmo(req.body?.data);
  res.status(201).send(createdGizmo);
}

export const updateGizmoPUT = (req, res) => {
  const updatedGizmo = examplesController.updateGizmo(req.body?.data);
  res.status(200).send(updatedGizmo);
}

export const deleteGizmoDELETE = (req, res) => {
  const deletedGizmo = examplesController.deleteGizmo(req.params?.name);
  res.status(200).send(deletedGizmo);
}

examplesRouter.get('/gizmos', listGizmosGET);
examplesRouter.get('/gizmo/:name', retrieveGizmoGET);
examplesRouter.post('/gizmo', createGizmoPOST);
examplesRouter.put('/gizmo', updateGizmoPUT);
examplesRouter.delete('/gizmo/:name', deleteGizmoDELETE);

export default examplesRouter;
