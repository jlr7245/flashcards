const Keyword = require('../models/Keyword');

const keywordsController = {};

keywordsController.getAll = (req, res, next) => {
  Keyword.findAll()
    .then((keywords) => {
      res.locals.keywords = keywords;
      next();
    })
    .catch(err => next(err));
};

keywordsController.show = (req, res, next) => {
  Keyword.findById(req.params.id)
    .then(keyword => keyword.flashcards())
    .then((keyword) => {
      res.render('keywords/keywords-show', {
        auth: !!req.user,
        keyword,
        flashcards: keyword.cards,
      });
    }).catch(err => next(err));
};

keywordsController.createOrUpdate = (req, res, next) => {
  Keyword.upsertSeveral(res.locals.keywords)
    .then((keywords) => {
      res.locals.keywordsFromDb = keywords;
      next();
    })
    .catch(err => next(err));
};

module.exports = keywordsController;
