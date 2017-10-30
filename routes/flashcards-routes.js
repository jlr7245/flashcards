const express = require('express');
const flashcardsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const flashcardsController = require('../controllers/flashcards-controller');

flashcardsRouter.get('/', flashcardsController.index);

flashcardsRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('flashcards/flashcards-new', {
    auth: req.user ? true : false,
  });
});
flashcardsRouter.post(
  '/',
  authHelpers.loginRequired,
  flashcardsController.create
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
