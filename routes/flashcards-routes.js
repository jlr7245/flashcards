const express = require('express');
const flashcardsRouter = express.Router();

const flashcardsController = require('../controllers/flashcards-controller');

flashcardsRouter.get('/', flashcardsController.index);

flashcardsRouter.get('/new', (req, res) => {
  res.render('flashcards/flashcards-new');
});
flashcardsRouter.post('/', flashcardsController.create);

flashcardsRouter.get('/:category([A-Za-z\-]+)', flashcardsController.category);

flashcardsRouter.get('/:id(\\d+)', flashcardsController.show);
flashcardsRouter.get('/:id(\\d+)/edit', flashcardsController.edit);
flashcardsRouter.put('/:id(\\d+)', flashcardsController.update);

flashcardsRouter.delete('/:id(\\d+)', flashcardsController.delete);

module.exports = flashcardsRouter;
