import express from 'express';

import healthcheck from './healthcheck/healthcheck.js';

const router = express.Router();

router.use('/healthcheck', healthcheck);

export default router;
