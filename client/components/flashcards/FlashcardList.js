import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardList = (props) => {
  const { flashcards } = props;
  return (
    <div className="flashcard-container">
      {flashcards.map(({id, category, difficulty, question}) => {
        return (
          <Link to={`/flashcards/${id}`} tabIndex='-1'>
            <div className="flashcard" key={id}>
              <div className="meta">
                <span className="category">{category}</span>
                <span className="difficulty">Difficulty: {difficulty}</span>
              </div>
              <h3>{question}</h3>
              <Link to={`/flashcards/${id}`} className="linktosingle" role='button' tabIndex='0'>
                See the answer!
              </Link>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default FlashcardList;
