function splitIds(req, res, next) {
  res.locals.flashcards = req.body.flashcardids.split(',');
  next();
}

module.exports = {
  splitIds,
};
