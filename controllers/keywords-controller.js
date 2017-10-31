const Keyword = require('../models/keyword');

const keywordsController = {};

keywordsController.getAll = (req, res, next) => {
  Keyword.findAll()
    .then(keywords => {
      res.locals.keywords = keywords;
      next();
    })
    .catch(err => next(err));
};

keywordsController.createOrUpdate = (req, res, next) => {
  Keyword.upsertSeveral(res.locals.keywords)
    .then(keywords => {
      res.locals.keywordsFromDb = keywords;
      next();
    })
    .catch(err => next(err));
};

module.exports = keywordsController;
