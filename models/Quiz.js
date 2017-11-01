const db = require('../db/config');

class Quiz {
  constructor(quiz) {
    this.id = quiz.id;
    this.name = quiz.name;
    this.description = quiz.description;
    this.public = quiz.public;
    this.user_id = quiz.user_id;
  }

  static findAll() {
    return db.many('SELECT * FROM quizzes ORDER BY id ASC');
  }

  static findAllPublic() {
    return db.many('SELECT * FROM quizzes WHERE public = TRUE ORDER BY id ASC');
  }

  static findById(id) {
    return db.one(`
      SELECT * FROM quizzes
      WHERE id = $1
    `, id)
      .then(quiz => new Quiz(quiz))
      .catch(err => err);
  }

  modify(changes) {
    return Object.assign(this, changes);
  }

  save() {
    return db.one(`
      INSERT INTO quizzes
      (name, description, public, user_id)
      VALUES ($/name/, $/description/, $/public/, $/user_id/)
      RETURNING *
    `, this)
      .then(quiz => this.modify(quiz))
      .catch(err => err);
  }

  relateFlashcards(flashcards) {
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
      .catch(err => err);
  }

  flashcards() {
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
      .catch(err => err);
  }
}

module.exports = Quiz;
