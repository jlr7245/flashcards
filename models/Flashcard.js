const db = require('../db/config');

class Flashcard {
  constructor(flashcard) {
    this.id = flashcard.id;
    this.question = flashcard.question;
    this.answer = flashcard.answer;
    this.category = flashcard.category;
    this.difficulty = flashcard.difficulty;
    this.user_id = flashcard.user_id;
  }
  static findAll() {
    return db.manyOrNone('SELECT * FROM flashcards');
  }

  static findById(id) {
    return db.one(
        `
      SELECT * FROM flashcards
      WHERE id = $1
    `,
        [id]
      )
      .then(flashcard => {
        return new Flashcard(flashcard);
      });
  }

  static findByCategory(category) {
    return db.manyOrNone(
      `
    SELECT * FROM flashcards
    WHERE category = $1
    `,
      [category]
    );
  }

  save() {
    return db.one(
      `
      INSERT INTO flashcards
      (question, answer, category, difficulty, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [this.question, this.answer, this.category, this.difficulty, this.user_id]
    );
  }

  modify(changes) {
    Object.assign(this, changes);
    return this;
  }

  update() {
    return db.one(
      `
      UPDATE flashcards SET
      question = $1,
      answer = $2,
      category = $3,
      difficulty = $4
      WHERE id = $5
      RETURNING *
    `,
      [
        this.question,
        this.answer,
        this.category,
        this.difficulty,
        this.user_id,
        this.id,
      ]
    );
  }

  static destroy(id) {
    return db.none(
      `DELETE FROM flashcards
      WHERE id = $1`,
      [id]
    );
  }
}

module.exports = Flashcard;
