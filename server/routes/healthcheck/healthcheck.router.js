import express from 'express';

const router = express.Router();

export const healthcheckGET = (req, res) => {
  res.send('Blue Skies Core is UP!');
}

router.get('/', healthcheckGET);

export default router;
