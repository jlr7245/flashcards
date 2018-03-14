const express            = require('express');
const keywordsController = require('../controllers/keywords-controller');

const keywordsRouter = express.Router();

keywordsRouter.get('/', (req, res) => {
  res.redirect('/api/flashcards');
});

keywordsRouter.get('/:id(\\d+)', keywordsController.show);

module.exports = keywordsRouter;
