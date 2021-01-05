import express from 'express';

import healthcheck from './healthcheck/healthcheck.router.js';
import examples from './examples/examples.router.js';

const router = express.Router();

router.use('/healthcheck', healthcheck);
router.use('/examples', examples);

export default router;
