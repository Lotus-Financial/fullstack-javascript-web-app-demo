import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Blue Skies Core is UP!');
});

export default router;
