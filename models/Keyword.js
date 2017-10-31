const db = require('../db/config');

class Keyword {
  constructor(keyword) {
    this.id = keyword.id,
    this.word = keyword.word;
    this.counter = keyword.counter;
  }

  static findAll() {
    return db.manyOrNone('SELECT * FROM keywords');
  }

  static findById(id) {
    return db.one(`
      SELECT * FROM keywords
      WHERE id = $1
    `, [id]).then(keyword => {
      return new Keyword(keyword);
    });
  }

  static upsertSeveral(keywords) {
    return db.tx(t => {
      const queries = keywords.map(keyword => {
        return db.one(`
          INSERT INTO keywords
          (word, counter)
          VALUES ($1, 1)
          ON CONFLICT (word) DO UPDATE
          SET counter = keywords.counter + 1
          RETURNING *
        `, [keyword]);
      });
      return t.batch(queries);
    });
  }

  flashcards() {
    return db.manyOrNone(`
      SELECT flashcards.* FROM flashcards
      JOIN flashcards_keywords ON flashcards_keywords.fc_id = flashcards.id
      JOIN keywords ON keywords.id = flashcards_keywords.kw_id
      WHERE keywords.id = $1
    `, [this.id])
      .then(flashcards => {
        this.flashcards = flashcards;
        return this;
      })
  }

}

module.exports = Keyword;
