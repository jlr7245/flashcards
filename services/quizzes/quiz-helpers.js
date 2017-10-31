function splitIds(req, res, next) {
  res.locals.flashcards = req.body.flashcards.split(',');
  next();
}

module.exports = {
  splitIds,
};
