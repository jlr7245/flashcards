CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY,
  question TEXT,
  answer TEXT,
  category VARCHAR(255),
  difficulty BIGINT
);

CREATE INDEX idx_category ON flashcards (category);
CREATE INDEX idx_difficulty ON flashcards (difficulty);