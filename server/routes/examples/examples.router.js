const express = require('express');

const examplesController = require('../../controllers/examples/examples.controller.js');

const examplesRouter = express.Router();

const listGizmosGET = async (req, res) => {
  const gizmos = await examplesController.listGizmos();
  res.status(200).send(gizmos);
}

const retrieveGizmoGET = async (req, res) => {
  const retrievedGizmo = examplesController.retrieveGizmo(req.params?.id);
  res.status(200).send(retrievedGizmo);
}

const createGizmoPOST = async (req, res) => {
  const createdGizmo = examplesController.createGizmo(req.body?.data);
  res.status(201).send(createdGizmo);
}

const updateGizmoPUT = async (req, res) => {
  const updatedGizmo = examplesController.updateGizmo(req.body?.data);
  res.status(200).send(updatedGizmo);
}

const deleteGizmoDELETE = async (req, res) => {
  const deletedGizmo = examplesController.deleteGizmo(req.params?.id);
  res.status(200).send(deletedGizmo);
}

examplesRouter.get('/gizmos', listGizmosGET);
examplesRouter.get('/gizmo/:id', retrieveGizmoGET);
examplesRouter.post('/gizmo', createGizmoPOST);
examplesRouter.put('/gizmo', updateGizmoPUT);
examplesRouter.delete('/gizmo/:id', deleteGizmoDELETE);

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
