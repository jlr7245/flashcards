import React from 'react'
import { Link } from 'react-router-dom';

export default ({ data }) => {
  return (
    <div className="slide">
      <div className="flashcard">
        <div className="meta">
          <span className="category">{data.category}</span>
          <span className="difficulty">Difficulty: {data.difficulty}</span>
        </div>
        <h3>{data.question}</h3>
        <Link className="linktosingle" to={`/flashcards/${data.id}`}>
          See the answer!
        </Link>
      </div>
    </div>
  )
}
