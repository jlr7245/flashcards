const Quiz = require('../models/Quiz');

const quizzesController = {};

quizzesController.index = (req, res, next) => {
  Quiz.findAll()
    .then((quizzes) => {
      res.json(quizzes);
    }).catch(next);
};

quizzesController.public = (req, res, next) => {
  Quiz.findAllPublic()
    .then((quizzes) => {
      res.json({
        auth: !!req.user,
        quizzes,
      });
    }).catch(next);
};

quizzesController.show = (req, res, next) => {
  Quiz.findById(req.params.id)
    .then(quiz => new Quiz(quiz).flashcards())
    .then((quiz) => {
      res.json({
        auth: !!req.user,
        quiz,
      });
    }).catch(next);
};

quizzesController.create = (req, res, next) => {
  new Quiz({
    name: req.body.name,
    description: req.body.description,
    public: req.body.public,
    user_id: req.user.id,
  }).save()
    .then(quiz => quiz.relateFlashcards(res.locals.flashcards))
    .then((quiz) => {
      res.redirect(`/quizzes/${quiz.id}`);
    })
    .catch(next);
};

module.exports = quizzesController;

