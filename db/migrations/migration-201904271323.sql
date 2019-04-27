CREATE TABLE IF NOT EXISTS keywords (
  id SERIAL PRIMARY KEY,
  keyword TEXT NOT NULL,
  count INTEGER
);

CREATE TABLE IF NOT EXISTS keywords_flashcards (
  id SERIAL PRIMARY KEY,
  kw_id INTEGER REFERENCES keywords(id),
  fc_id INTEGER REFERENCES flashcards(id)
);
