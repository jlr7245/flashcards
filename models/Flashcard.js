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
    return db.many('SELECT * FROM flashcards ORDER BY id ASC');
  }

  static findById(id) {
    return db.one(`
      SELECT * FROM flashcards
      WHERE id = $1
    `, id)
      .then(flashcard => new Flashcard(flashcard));
  }

  static findByCategory(category) {
    return db.many(`
      SELECT * FROM flashcards
      WHERE category = $1
    `, category);
  }

  save() {
    return db.one(`
      INSERT INTO flashcards(
        question, answer, category, difficulty, user_id
      ) VALUES (
        $/question/, $/answer/, $/category/, $/difficulty/, $/user_id/
      )
      RETURNING *
    `, this)
      .then(flashcard => this.modify(flashcard));
  }

  modify(changes) {
    return Object.assign(this, changes);
  }

  update() {
    return db.one(`
      UPDATE
        flashcards
      SET
        question = $/question/,
        answer = $/answer/,
        category = $/category/,
        difficulty = $/difficulty/
        WHERE id = $/id/
      RETURNING *
    `, this)
      .then(flashcard => this.modify(flashcard));
  }

  keywords() {
    return db.many(`
      SELECT keywords.*
        FROM keywords
        JOIN flashcards_keywords
              ON flashcards_keywords.kw_id = keywords.id
        JOIN flashcards
              ON flashcards.id = flashcards_keywords.fc_id
       WHERE flashcards.id = $/id/
    `, this)
      .then((keywords) => {
        this.words = keywords;
        return this;
      });
  }

  relateKeywords(keywords) {
    return db.tx((t) => {
      const queries = keywords.map((keyword) => {
        return t.one(`
          INSERT INTO flashcards_keywords
          (kw_id, fc_id)
          VALUES ($1, $2)
          RETURNING *
        `, [keyword.id, this.id]);
      });
      return t.batch(queries);
    });
  }

  static destroy(id) {
    return db.none(`
      DELETE FROM flashcards
      WHERE id = $1
    `, id);
  }
}

module.exports = Flashcard;
