const express = require('express');

const router = express.Router();

const healthcheckGET = (req, res) => {
  res.send('Blue Skies Core is UP!');
}

router.get('/', healthcheckGET);

module.exports = {
  router,
  callbacks: { healthcheckGET }
};
