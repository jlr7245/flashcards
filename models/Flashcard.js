const db = require('../db/config');

function Flashcard(card) {
  this.id = card.id || null;
  this.question = this.validate(card.question, 'question');
  this.answer = this.validate(card.answer, 'answer');
  this.difficulty = this.validate(card.difficulty, 'difficulty');
  this.category = this.validate(card.category, 'category');
  this.user_id = this.validate(card.user_id, 'user id');
}

const flashcardStatics = require('./model-defaults')('flashcards');
flashcardStatics.findByCategory = (category) => {
  return db.manyOrNone(`
    SELECT * FROM flashcards
    WHERE category = $1
  `, category);
}
Object.setPrototypeOf(Flashcard, flashcardStatics);

Flashcard.prototype = Object.assign(Flashcard.prototype, require('./utils'));

Flashcard.prototype.save = function() {
  return db.one(`
    INSERT INTO flashcards
    (question, answer, difficulty, category, user_id)
    VALUES ($/question/, $/answer/, $/difficulty/, $/category/, $/user_id/)
    RETURNING *
  `, this)
    .then(flashcard => this.modify(flashcard));
}

Flashcard.prototype.update = function(changes) {
  this.modify(changes);
  return db.one(`
    UPDATE flashcards SET
    question = $/question/,
    answer = $/answer/,
    difficulty = $/difficulty/,
    category = $/category/
    WHERE id = $/id/
    RETURNING *
  `, this)
    .then(flashcard => this.modify(flashcard));
}

Flashcard.prototype.keywords = function() {
  return db.manyOrNone(
    `SELECT keywords.*
    FROM keywords
    JOIN flashcards_keywords
          ON flashcards_keywords.kw_id = keywords.id
    JOIN flashcards
          ON flashcards.id = flashcards_keywords.fc_id
   WHERE flashcards.id = $/id/`, this)
    .then(keywords => {
      this.words = keywords;
      return this;
    });
}

Flashcard.prototype.relateKeywords = function(keywords) {
  return db.tx(t => {
    const queries = keywords.map(keyword => {
      return t.one(`
        INSERT INTO flashcards_keywords
        (kw_id, fc_id)
        VALUES ($1, $2)
        RETURNING *
      `, [keyword.id, this.id])
    });
    return t.batch(queries);
  });
}

module.exports = Flashcard;
