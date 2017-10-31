const express = require('express');
const quizRouter = express.Router();
const quizzesController = require('../controllers/quizzes-controller');

const quizHelpers = require('../services/quizzes/quiz-helpers');

quizRouter.get('/', quizzesController.public);
quizRouter.post('/', quizHelpers.splitIds, quizzesController.create);

quizRouter.get('/:id', quizzesController.show);

module.exports = quizRouter;
