import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardList = (props) => {
  const { flashcards } = props;
  console.log(props);
  return (
    <div className="flashcards-list">
      {flashcards.map(({id, category, difficulty, question}) => {
        return (
          <div className="flashcard" key={id}>
            <div className="meta">
              <span className="category">{category}</span>
              <span className="difficulty">Difficulty: {difficulty}</span>
            </div>
            <h3>{question}</h3>
            <Link className="linktosingle" to={`/flashcards/${id}`}>See the answer!</Link>
          </div>
        )
      })}
    </div>
  )
}

export default FlashcardList;
