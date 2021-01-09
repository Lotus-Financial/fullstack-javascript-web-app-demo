const express = require('express');

const healthcheck = require('./healthcheck/healthcheck.router.js').router;
const examples = require('./examples/examples.router.js').router;

const router = express.Router();

router.use('/healthcheck', healthcheck);
router.use('/examples', examples);

module.exports = router;
