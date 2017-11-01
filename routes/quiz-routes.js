const express           = require('express');
const quizzesController = require('../controllers/quizzes-controller');
const quizHelpers       = require('../services/quizzes/quiz-helpers');

const quizRouter = express.Router();


quizRouter.route('/')
  .get(quizzesController.public)
  .post(quizHelpers.splitIds, quizzesController.create);

quizRouter.get('/:id', quizzesController.show);

module.exports = quizRouter;
