const db = require('../db/config');

const Flashcard = {};

Flashcard.findAll = () => {
  return db.manyOrNone('SELECT * FROM flashcards');
};

Flashcard.findById = id => {
  return db.one(
    `
    SELECT * FROM flashcards
    WHERE id = $1
  `,
    [id],
  );
};

Flashcard.create = flashcard => {
  return db.one(
    `
    INSERT INTO flashcards
    (question, answer, category, difficulty)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    [
      flashcard.question,
      flashcard.answer,
      flashcard.category,
      flashcard.difficulty,
    ],
  );
};

Flashcard.update = (flashcard, id) => {
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
      flashcard.question,
      flashcard.answer,
      flashcard.category,
      flashcard.difficulty,
      id,
    ],
  );
};

Flashcard.destroy = id => {
  return db.none(
    `
    DELETE FROM flashcards
    WHERE id = $1
  `,
    [id],
  );
};

module.exports = Flashcard;
