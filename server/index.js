const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/router.js');
const db = require('./db/models');

const app = express();

app.use(bodyParser.json());

app.use(router);

// TODO: Decide if force drop and re-sync is needed
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync();

app.listen(3000, () => console.log('Server running on port 3000!'));

module.exports = app;
