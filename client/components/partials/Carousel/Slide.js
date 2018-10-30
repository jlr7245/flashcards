import React from 'react'
import { Link } from 'react-router-dom';

export default ({ data, isCurrent }) => {
  return (
    <div
      className="slide"
      aria-hidden={isCurrent ? 'false' : 'true'}
    >
      <div className="flashcard">
        <div className="meta">
          <span className="category">{data.category}</span>
          <span className="difficulty">Difficulty: {data.difficulty}</span>
        </div>
        <h3>{data.question}</h3>
        <Link
          className="linktosingle"
          to={`/flashcards/${data.id}`}
          tabIndex={isCurrent ? 0 : -1}
        >
          See the answer!
        </Link>
      </div>
    </div>
  )
}
