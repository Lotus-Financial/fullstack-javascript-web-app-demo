import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/router.js';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => console.log('Server running on port 3000!'));
