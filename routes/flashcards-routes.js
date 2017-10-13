const express = require('express');
const flashcardsRouter = express.Router();

const flashcardsController = require('../controllers/flashcards-controller');

flashcardsRouter.get('/', flashcardsController.index);

flashcardsRouter.get('/new', (req, res) => {
  res.render('flashcards/flashcards-new');
});
flashcardsRouter.post('/', flashcardsController.create);

flashcardsRouter.get('/:id', flashcardsController.show);
flashcardsRouter.get('/:id/edit', flashcardsController.edit);
flashcardsRouter.put('/:id', flashcardsController.update);

flashcardsRouter.delete('/:id', flashcardsController.delete);

module.exports = flashcardsRouter;
