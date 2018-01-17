import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardSingle = props => {
  const { flashcards } = props;
  const {
    question = null,
    category = null,
    difficulty = null,
    answer = null,
  } = flashcards.length > 0 && flashcards.find(flashcard => flashcard.id === props.id);

  return (
    <div className="flashcard-single-container">
      <div className="flashcard">
        <p className="question">{question}</p>
        <h3>{answer}</h3>
        <div className="meta">
          <span className="category">{category}</span>
          <span className="difficulty">Difficulty: {difficulty}</span>
        </div>
        <Link className="linktosingle" to="/flashcards">Back to all flashcards</Link>
      </div>
    </div>
  );
};

export default FlashcardSingle;
