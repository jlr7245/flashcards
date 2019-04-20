const express = require('express');
const authHelpers = require('../services/auth/auth-helpers');
const flashcardsController = require('../controllers/flashcards-controller');
const keywordHelpers = require('../services/keywords/keyword-helpers');

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

flashcardsRouter.get(
  '/:category([A-Za-z-]+)',
  flashcardsController.category
);

flashcardsRouter
  .route('/:id(\\d+)')
  .get(flashcardsController.show)
  .put(
    authHelpers.loginRequired,
    flashcardsController.update
  )
  .delete(
    authHelpers.loginRequired,
    flashcardsController.delete
  );

flashcardsRouter
  .route('/')
  .get(flashcardsController.index)
  .post(
    authHelpers.loginRequired,
    keywordHelpers.fetchKeywordsForQuestion,
    flashcardsController.create
  );

module.exports = flashcardsRouter;
