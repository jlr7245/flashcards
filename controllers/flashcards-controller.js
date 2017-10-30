const Flashcard = require('../models/flashcard');
const categoryLookup = require('./category-lookup');

const flashcardsController = {};

flashcardsController.index = (req, res) => {
  Flashcard.findAll()
    .then(flashcards => {
      res.status(200).render('flashcards/flashcards-index', {
        auth: req.user ? true : false,
        flashcards,
      });
    })
    .catch(err => next(err));
};

flashcardsController.show = (req, res) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => {
      res.status(200).render('flashcards/flashcards-show', {
        auth: req.user ? true : false,
        flashcard,
      });
    })
    .catch(err => next(err));
};

flashcardsController.category = (req, res) => {
  Flashcard.findByCategory(categoryLookup[req.params.category])
    .then(flashcards => {
      res.status(200).render('flashcards/flashcards-index', {
        auth: req.user ? true : false,
        flashcards,
      });
    })
    .catch(err => next(err));
};

flashcardsController.create = (req, res) => {
  new Flashcard({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    difficulty: req.body.difficulty,
  })
    .save()
    .then(flashcard => {
      res.redirect(`/flashcards/${flashcard.id}`);
    })
    .catch(err => next(err));
};

flashcardsController.edit = (req, res) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => {
      res.status(200).render('flashcards/flashcards-edit', {
        auth: req.user ? true : false,
        flashcard,
      });
    })
    .catch(err => next(err));
};

flashcardsController.update = (req, res) => {
  Flashcard.findById(req.params.id)
    .modify({
      question: req.body.question,
      answer: req.body.answer,
      category: req.body.category,
      difficulty: req.body.difficulty,
    })
    .update()
    .then(flashcard => {
      res.redirect(`/flashcards/${flashcard.id}`);
    })
    .catch(err => next(err));
};

flashcardsController.delete = (req, res) => {
  Flashcard.destroy(req.params.id)
    .then(() => {
      res.redirect('/flashcards');
    })
    .catch(err => next(err));
};

module.exports = flashcardsController;
