const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/router.js');
const db = require('../db/models');

const app = express();

app.use(bodyParser.json());

app.use(router);

db.sequelize.sync();

try {
  db.sequelize.authenticate().then(() => {
    console.log('Database connection has been successfully established.');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


app.listen(3000, () => console.log('Server running on port 3000!'));

module.exports = app;
