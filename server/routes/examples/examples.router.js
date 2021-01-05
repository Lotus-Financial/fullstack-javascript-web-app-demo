import express from 'express';

import examples from '../../mocks/examples/gizmos.example.json'

const router = express.Router();

router.get('/gizmos', (req, res) => {
    res.status(200).send(examples.gizmos);
});

router.get('/gizmo', (req, res) => {
    res.status(200).send(examples.gizmos[0]);
});

export default router;
