import React from 'react';

const FlashcardList = (props) => {
  const { flashcards } = props;
  return (
    <div className="flashcard-list">
      <ul>
        {flashcards.map(flashcard => {
          return <li key={flashcard.id}>{flashcard.question}</li>;
        })}
      </ul>
    </div>  
  )
}

export default FlashcardList;