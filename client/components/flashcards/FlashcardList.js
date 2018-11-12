import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardList = (props) => {
  const { flashcards, offset, setRef } = props;
  return (
    <div className="flashcard-container">
      {flashcards.map(({id, category, difficulty, question}, idx) => {
        const ref = idx === offset - 12
          ? { ref: (elem) => setRef(elem, 'nextElemForFocus'), tabIndex: '0' }
          : {}
        return (
          <Link to={`/flashcards/${id}`} aria-label={question} key={id}>
            <div className="flashcard" key={id} {...ref}>
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
