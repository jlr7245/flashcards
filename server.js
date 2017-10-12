const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found!');
});
