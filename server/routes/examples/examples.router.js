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

});

router.delete('/gizmo', (req, res) => {

});


export default router;
