const express              = require('express');
const authHelpers          = require('../services/auth/auth-helpers');
const keywordHelpers       = require('../services/keywords/keyword-helpers');
const flashcardsController = require('../controllers/flashcards-controller');
const keywordsController   = require('../controllers/keywords-controller');

const flashcardsRouter = express.Router();

flashcardsRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('flashcards/flashcards-new', {
    auth: !!req.user,
  });
});

flashcardsRouter.get(
  '/:id(\\d+)/edit',
  authHelpers.loginRequired,
  flashcardsController.edit
);


flashcardsRouter.get('/:category([A-Za-z-]+)', flashcardsController.category);

flashcardsRouter.route('/:id(\\d+)')
  .get(flashcardsController.show)
  .put(
    authHelpers.loginRequired,
    flashcardsController.update
  )
  .delete(
    authHelpers.loginRequired,
    flashcardsController.delete
  );

flashcardsRouter.route('/')
  .get(
    keywordsController.getAll,
    flashcardsController.index,
    flashcardsController.limited
  )
  .post(
    authHelpers.loginRequired,
    keywordHelpers.getKeywords,
    keywordHelpers.formatApiData,
    flashcardsController.create,
    keywordsController.createOrUpdate,
    flashcardsController.createKeywordsFlashcards
  );

module.exports = flashcardsRouter;
