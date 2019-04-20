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
flashcardStatics.findByCategory = category =>
  db.manyOrNone(
    `
    SELECT * FROM flashcards
    WHERE category = $1
  `,
    category
  );
Object.setPrototypeOf(Flashcard, flashcardStatics);

Flashcard.prototype = Object.assign(Flashcard.prototype, require('./utils'));

Flashcard.prototype.save = function() {
  return db
    .one(
      `
    INSERT INTO flashcards
    (question, answer, difficulty, category, user_id)
    VALUES ($/question/, $/answer/, $/difficulty/, $/category/, $/user_id/)
    RETURNING *
  `,
      this
    )
    .then(flashcard => this.modify(flashcard));
};

Flashcard.prototype.update = function(changes) {
  this.modify(changes);
  return db
    .one(
      `
    UPDATE flashcards SET
    question = $/question/,
    answer = $/answer/,
    difficulty = $/difficulty/,
    category = $/category/
    WHERE id = $/id/
    RETURNING *
  `,
      this
    )
    .then(flashcard => this.modify(flashcard));
};

module.exports = Flashcard;
