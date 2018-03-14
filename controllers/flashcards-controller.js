const Flashcard = require('../models/Flashcard');
const categoryLookup = require('./category-lookup');

const flashcardsController = {};

flashcardsController.index = (req, res, next) => {
  Flashcard.findAll()
    .then((flashcards) => {
      res.status(200).json({
        data: { 
          flashcards,
          keywords: res.locals.keywords,
         },
        auth: !!req.user,
      });
    })
    .catch(next);
};

flashcardsController.show = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => new Flashcard(flashcard).keywords())
    .then((flashcard) => {
      res.status(200).json({
        auth: !!req.user,
        data: {
          flashcard,
          keywords: flashcard.words,
        },
      });
    })
    .catch(next);
};

flashcardsController.category = (req, res, next) => {
  Flashcard.findByCategory(categoryLookup[req.params.category])
    .then((flashcards) => {
      res.status(200).json({
        auth: !!req.user,
        data: { flashcards },
      });
    })
    .catch(next);
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
    .catch(next);
};

flashcardsController.edit = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then((flashcard) => {
      res.status(200).json({
        auth: !!req.user,
        data: { flashcard },
      });
    })
    .catch(next);
};

flashcardsController.update = (req, res, next) => {
  Flashcard.findById(req.params.id)
    .then((flashcard) => {
      return new Flashcard(flashcard).update({
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category,
        difficulty: req.body.difficulty,
      });
    }).then((flashcard) => {
      res.redirect(`/flashcards/${flashcard.id}`);
    })
    .catch(next);
};

flashcardsController.delete = (req, res, next) => {
  Flashcard.destroy(req.params.id)
    .then(() => {
      res.redirect('/flashcards');
    })
    .catch(next);
};

flashcardsController.createKeywordsFlashcards = (req, res, next) => {
  new Flashcard(res.locals.flashcard)
    .relateKeywords(res.locals.keywordsFromDb)
    .then((keywordsFlashcards) => {
      res.redirect(`/flashcards/${res.locals.flashcard.id}`);
    })
    .catch(next);
};

module.exports = flashcardsController;
