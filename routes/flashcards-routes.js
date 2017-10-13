const express = require('express');
const flashcardsRouter = express.Router();

const flashcardsController = require('../controllers/flashcards-controller');

flashcardsRouter.get('/', flashcardsController.index);
flashcardsRouter.get('/:id', flashcardsController.show);

flashcardsRouter.post('/', flashcardsController.create);

flashcardsRouter.put('/:id', flashcardsController.update);
flashcardsRouter.delete('/:id', flashcardsController.delete);

module.exports = flashcardsRouter;
