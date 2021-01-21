const express = require('express');

const router = express.Router();

const asyncHandler = require('../../helpers/asyncHandler.helper');

const healthcheckGET = (req, res) => {
  res.send('Blue Skies Core is UP!');
}

router.get('/', asyncHandler(healthcheckGET));

module.exports = {
  router,
  callbacks: { healthcheckGET }
};
