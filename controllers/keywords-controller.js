const Keyword = require('../models/Keyword');

const keywordsController = {};

keywordsController.getAll = (req, res, next) => {
  Keyword.findAll()
    .then((keywords) => {
      res.locals.keywords = keywords;
      next();
    })
    .catch(next);
};

keywordsController.show = (req, res, next) => {
  Keyword.findById(req.params.id)
    .then(keyword => new Keyword(keyword).flashcards())
    .then((keyword) => {
      res.json({
        auth: !!req.user,
        data: {
          keyword,
          flashcards: keyword.cards,
        },
      });
    }).catch(next);
};

keywordsController.createOrUpdate = (req, res, next) => {
  Keyword.upsertSeveral(res.locals.keywords)
    .then((keywords) => {
      res.locals.keywordsFromDb = keywords;
      next();
    })
    .catch(next);
};

module.exports = keywordsController;
