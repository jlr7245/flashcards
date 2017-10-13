const Flashcard = require('../models/flashcard');

const flashcardsController = {};

flashcardsController.index = (req, res) => {
  Flashcard.findAll()
    .then(flashcards => {
      res.status(200).render('flashcards/flashcards-index', {
        flashcards,
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
      res.status(200).render('flashcards/flashcards-show', {
        flashcard
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
    res.redirect(`/flashcards/${flashcard.id}`)
  }).catch(err => {
    res.status(500).json({
      err,
    });
  });
};

flashcardsController.edit = (req, res) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => {
      res.status(200).render('flashcards/flashcards-edit', {
        flashcard,
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
      res.redirect(`/flashcards/${flashcard.id}`)
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

flashcardsController.delete = (req, res) => {
  Flashcard.destroy(req.params.id)
    .then(() => {
      res.redirect('/flashcards');
    }).catch(err => {
      res.status(500).json({
        err,
      });
    });
};

module.exports = flashcardsController;
