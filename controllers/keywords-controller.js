const Keyword = require('../models/Keyword');

const keywordsController = {};

keywordsController.create = (req, res, next) => {
  const keywords = res.locals.keywords;
  Promise.all(keywords.map(keyword => new Keyword({ keyword }).save()))
    .then(createdKeywords => {
      console.log(createdKeywords);
      res.locals.createdKeywords = createdKeywords;
      next();
    })
    .catch(next);
}

module.exports = keywordsController;