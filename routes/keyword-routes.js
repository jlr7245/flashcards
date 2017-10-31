const express = require('express');
const keywordsRouter = express.Router();

const keywordsController = require('../controllers/keywords-controller');

keywordsRouter.get('/', (req, res) => {
  res.redirect('/flashcards');
});

keywordsRouter.get('/:id(\\d+)', keywordsController.show);

module.exports = keywordsRouter;
