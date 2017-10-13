const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const flashcardsRouter = require('./routes/flashcards-routes');
app.use('/flashcards', flashcardsRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not Found!');
});
