const express = require('express');
const quizRouter = express.Router;
const quizController = require('../controllers/quizzes-controller');

const quizHelpers = require('../services/quizzes/quiz-helpers');

quizRouter.get('/', quizController.index);
quizRouter.post('/', quizController.create);

module.exports = quizRouter;
