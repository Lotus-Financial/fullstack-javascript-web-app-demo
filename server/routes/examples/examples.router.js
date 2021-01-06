import express from 'express';

import examplesController from '../../controllers/examples/examples.controller.js';

const router = express.Router();

router.get('/gizmos', (req, res) => {
  const gizmos = examplesController.listGizmos();
  res.status(200).send(gizmos);
});

router.get('/gizmo/:name', (req, res) => {
  const retrievedGizmo = examplesController.retrieveGizmo(req.params?.name);
  res.status(200).send(retrievedGizmo);
});

router.post('/gizmo', (req, res) => {
  const createdGizmo = examplesController.createGizmo(req.body?.data);
  res.status(201).send(createdGizmo);
});

router.put('/gizmo', (req, res) => {
  const updatedGizmo = examplesController.updateGizmo(req.body?.data);
  res.status(200).send(updatedGizmo);
});

router.delete('/gizmo/:name', (req, res) => {
  const deletedGizmo = examplesController.deleteGizmo(req.params?.name);
  res.status(200).send(deletedGizmo);
});

export default router;
