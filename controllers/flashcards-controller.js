const Flashcard = require('../models/Flashcard');
const categoryLookup = require('./category-lookup');

const flashcardsController = {};

flashcardsController.index = (req, res, next) => {
  Flashcard.findAll()
    .then((flashcards) => {
      res.status(200).render('flashcards/flashcards-index', {
        auth: !!req.user,
        flashcards,
      });
    })
    .catch(err => next(err));
};

flashcardsController.show = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => flashcard.keywords())
    .then((flashcard) => {
      res.status(200).render('flashcards/flashcards-show', {
        auth: !!req.user,
        current_user: (req.user) ? req.user.id : 0,
        flashcard,
        keywords: flashcard.words,
      });
    })
    .catch(err => next(err));
};

flashcardsController.category = (req, res, next) => {
  Flashcard.findByCategory(categoryLookup[req.params.category])
    .then((flashcards) => {
      res.status(200).render('flashcards/flashcards-index', {
        auth: !!req.user,
        flashcards,
      });
    })
    .catch(err => next(err));
};

flashcardsController.create = (req, res, next) => {
  new Flashcard({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    difficulty: req.body.difficulty,
    user_id: req.user.id,
  })
    .save()
    .then((flashcard) => {
      res.locals.flashcard = flashcard;
      next();
    })
    .catch(err => next(err));
};

flashcardsController.edit = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then((flashcard) => {
      res.status(200).render('flashcards/flashcards-edit', {
        auth: !!req.user,
        current_user: (req.user) ? req.user.id : 0,
        flashcard,
      });
    })
    .catch(err => next(err));
};

flashcardsController.update = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then((flashcard) => {
      return flashcard.modify({
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category,
        difficulty: req.body.difficulty,
      })
        .update();
    })
    .then((flashcard) => {
      res.redirect(`/flashcards/${flashcard.id}`);
    })
    .catch(err => next(err));
};

flashcardsController.delete = (req, res, next) => {
  Flashcard.destroy(req.params.id)
    .then(() => {
      res.redirect('/flashcards');
    })
    .catch(err => next(err));
};

flashcardsController.createKeywordsFlashcards = (req, res, next) => {
  res.locals.flashcard
    .relateKeywords(res.locals.keywordsFromDb)
    .then((keywordsFlashcards) => {
      res.redirect(`/flashcards/${res.locals.flashcard.id}`);
    })
    .catch(err => next(err));
};

module.exports = flashcardsController;
