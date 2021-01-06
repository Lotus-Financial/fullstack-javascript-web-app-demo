import express from 'express';

const router = express.Router();

export const healthcheckGetRoute = (req, res) => {
  res.send('Blue Skies Core is UP!');
}

router.get('/', healthcheckGetRoute);

export default router;
