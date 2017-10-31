const Quiz = require('../models/Quiz');

const quizzesController = {};

quizzesController.index = (req, res, next) => {
  Quiz.findAll()
    .then(quizzes => {
      res.json(quizzes);
    }).catch(err => next(err));
};

quizzesController.public = (req, res, next) => {
  Quiz.findAllPublic()
    .then(quizzes => {
      res.json({
        auth: req.user ? true : false,
        quizzes,
      })
    }).catch(err => next(err));
};

quizzesController.show = (req, res, next) => {
  Quiz.findById(req.params.id)
    .then(quiz => quiz.flashcards())
    .then(quiz => {
      res.json({
        auth: req.user ? true : false,
        quiz,
        flashcards: quiz.cards,
      });
    }).catch(err => next(err));
};

quizzesController.create = (req, res, next) => {
  new Quiz({
    name: req.body.name,
    description: req.body.description,
    public: req.body.public,
    user_id: req.user.id,
  }).save()
    .then(quiz => quiz.relateFlashcards(res.locals.flashcards))
    .then(quiz => {
      res.redirect(`/quizzes/${quiz.id}`);
    }).catch(err => next(err));
};

module.exports = quizzesController;

