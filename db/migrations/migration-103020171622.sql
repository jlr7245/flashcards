CREATE TABLE IF NOT EXISTS keywords (
  id SERIAL PRIMARY KEY,
  word VARCHAR(255),
  counter INTEGER
);

CREATE TABLE IF NOT EXISTS flashcards_keywords (
  id SERIAL PRIMARY KEY,
  fc_id INTEGER REFERENCES flashcards(id),
  kw_id INTEGER REFERENCES keywords(id)
);

CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  public BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS quizzes_flashcards (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  fc_id INTEGER REFERENCES flashcards(id)
);
