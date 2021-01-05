import express from 'express';

import examplesController from '../../controllers/examples/examples.controller.js';
import examples from '../../mocks/examples/gizmos.example.json';

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
  examples.gizmos.push(req.body.data);
  res.status(201).send(examples.gizmos);
});

router.put('/gizmo', (req, res) => {
  const gizmoToUpdate = examples.gizmos.find(el => el.name === req.body.data.name);
  gizmoToUpdate.name = req.body?.data?.name;
  gizmoToUpdate.type = req.body?.data?.type;
  res.status(200).send(examples.gizmos);
});

router.delete('/gizmo', (req, res) => {
  const deleteI = examples.gizmos.findIndex(el => el.name === req.body?.data?.name)
  const deletedGizmo = examples.gizmos.splice(deleteI, 1);
  res.status(200).send(deletedGizmo);
});

export default router;
