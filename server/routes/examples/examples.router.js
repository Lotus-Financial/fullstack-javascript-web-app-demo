import express from 'express';

import examples from '../../mocks/examples/gizmos.example.json'

const router = express.Router();

router.get('/gizmos', (req, res) => {
  res.status(200).send(examples.gizmos);
});

router.get('/gizmo', (req, res) => {
  res.status(200).send(examples.gizmos[0]);
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
