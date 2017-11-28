const db = require('../db/config');

function Keyword(keyword) {
  this.id = keyword.id || null;
  this.word = this.validate(keyword.word, 'word');
  this.counter = this.validate(keyword.counter, 'counter');
}

const keywordStatics = require('./model-defaults')('keywords');
keywordStatics.upsertSeveral = (keywords) => {
  return db.tx((t) => {
    const queries = keywords.map((keyword) => {
      return t.one(`
        INSERT INTO keywords
        (word, counter)
        VALUES ($1, 1)
        ON CONFLICT (word) DO UPDATE
        SET counter = keywords.counter + 1
        RETURNING *
      `, keyword);
    });
    return t.batch(queries);
  });
}
Object.setPrototypeOf(Keyword, keywordStatics);

Keyword.prototype = Object.assign(Keyword.prototype, require('./utils'));

Keyword.prototype.flashcards = function() {
  return db.manyOrNone(`
    SELECT flashcards.* 
      FROM flashcards
      JOIN flashcards_keywords 
          ON flashcards_keywords.fc_id = flashcards.id
      JOIN keywords 
          ON keywords.id = flashcards_keywords.kw_id
    WHERE keywords.id = $1
  `, this.id)
  .then((flashcards) => {
    this.cards = flashcards;
    return this;
  });
}

module.exports = Keyword;
