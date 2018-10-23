import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardList = (props) => {
  const { flashcards } = props;
  return (
    <div className="flashcard-container">
      {flashcards.map(({id, category, difficulty, question}) => {
        return (
          <Link to={`/flashcards/${id}`} aria-label={question}>
            <div className="flashcard" key={id}>
              <div className="meta">
                <span className="category">{category}</span>
                <span className="difficulty">Difficulty: {difficulty}</span>
              </div>
              <h3>{question}</h3>
              <span className="linktosingle">
                See the answer!
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default FlashcardList;
