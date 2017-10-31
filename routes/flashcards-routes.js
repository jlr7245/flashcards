const express = require('express');
const flashcardsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const keywordHelpers = require('../services/keywords/keyword-helpers');

const flashcardsController = require('../controllers/flashcards-controller');
const keywordsController = require('../controllers/keywords-controller');

flashcardsRouter.get('/', flashcardsController.index);

flashcardsRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('flashcards/flashcards-new', {
    auth: req.user ? true : false,
  });
});
flashcardsRouter.post(
  '/',
  authHelpers.loginRequired,
  keywordHelpers.getKeywords,
  keywordHelpers.formatApiData,
  flashcardsController.create,
  keywordsController.createOrUpdate,
  flashcardsController.createKeywordsFlashcards
);

flashcardsRouter.get('/:category([A-Za-z-]+)', flashcardsController.category);

flashcardsRouter.get('/:id(\\d+)', flashcardsController.show);
flashcardsRouter.get(
  '/:id(\\d+)/edit',
  authHelpers.loginRequired,
  flashcardsController.edit
);
flashcardsRouter.put(
  '/:id(\\d+)',
  authHelpers.loginRequired,
  flashcardsController.update
);

flashcardsRouter.delete(
  '/:id(\\d+)',
  authHelpers.loginRequired,
  flashcardsController.delete
);

module.exports = flashcardsRouter;
