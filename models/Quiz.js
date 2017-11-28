const db = require('../db/config');

function Quiz(quiz) {
  this.id = quiz.id || null;
  this.name = this.validate(quiz.name, 'name');
  this.description = this.validate(quiz.description, 'description');
  this.public = this.validate(quiz.public, 'public');
  this.user_id = this.validate(quiz.user_id, 'user id');
}

const quizStatics = require('./model-defaults')('quizzes');
quizStatics.findAllPublic = () => {
  return db.manyOrNone('SELECT * FROM quizzes WHERE public = TRUE ORDER BY id ASC');
}
Object.setPrototypeOf(Quiz, quizStatics);

Quiz.prototype = Object.assign(Quiz.prototype, require('./utils'));

Quiz.prototype.save = function() {
  return db.one(`
    INSERT INTO quizzes
    (name, description, public, user_id)
    VALUES ($/name/, $/description/, $/public/, $/user_id/)
    RETURNING *
  `, this)
  .then(quiz => this.modify(quiz))
}

Quiz.prototype.relateFlashcards = function(flashcards) {
  return db.tx((t) => {
    const queries = flashcards.map(flashcard => t.one(`
      INSERT INTO quizzes_flashcards
      (quiz_id, fc_id)
      VALUES ($1, $2)
      RETURNING *
    `, [this.id, flashcard]));
    return t.batch(queries);
  })
    .then((quizzesFlashcards) => {
      this.quizzesFlashcards = quizzesFlashcards;
      return this;
    })
}

Quiz.prototype.flashcards = function() {
  return db.many(`
    SELECT flashcards.*
      FROM flashcards
      JOIN quizzes_flashcards
          ON flashcards.id = quizzes_flashcards.fc_id
      JOIN quizzes
          ON quizzes.id = quizzes_flashcards.quiz_id
    WHERE quizzes.id = $/id/
  `, this)
  .then((flashcards) => {
    this.cards = flashcards;
    return this;
  })
}

module.exports = Quiz;
