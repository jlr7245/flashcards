const Flashcard = require('../models/flashcard');

const flashcardsController = {};

flashcardsController.index = (req, res) => {
  Flashcard.findAll()
    .then(flashcards => {
      res.status(200).json({
        message: 'ok',
        data: {
          flashcards,
        },
      });
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

flashcardsController.show = (req, res) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => {
      res.status(200).json({
        message: 'ok',
        data: {
          flashcard,
        },
      });
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

flashcardsController.create = (req, res) => {
  Flashcard.create({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    difficulty: req.body.difficulty,
  })
  .then(flashcard => {
    res.status(200).json({
      message: 'ok',
      data: {
        flashcard,
      },
    });
  }).catch(err => {
    res.status(500).json({
      err,
    });
  });
};

flashcardsController.update = (req, res) => {
  Flashcard.update(
    {
      question: req.body.question,
      answer: req.body.answer,
      category: req.body.category,
      difficulty: req.body.difficulty,
    },
    req.params.id
  )
    .then(flashcard => {
      res.status(200).json({
        message: 'ok',
        data: {
          flashcard,
        },
      });
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

flashcardsController.delete = (req, res) => {
  Flashcard.destroy(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'deleted successfully',
        data: null,
      });
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

module.exports = flashcardsController;
