import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { isLoading } from '../../actions/is-loading';

class FlashcardSingle extends Component {
  showFlashcard() {
    const { flashcards, id } = this.props;
    const { 
      question, 
      answer, 
      category, 
      difficulty } = flashcards.find(flashcard => flashcard.id === parseInt(id));
    return (
      <div className="flashcard">
        <p className="question">{question}</p>
        <h3>{answer}</h3>
        <div className="meta">
          <span className="category">{category}</span>
          <span className="difficulty">Difficulty: {difficulty}</span>
        </div>
        <Link className="linktosingle" to="/flashcards">Back to all flashcards</Link>
      </div>
    )
  }
  
  render() {
    const { isLoading, flashcards } = this.props;
    return (
      <div className="flashcard-single-container">
        {!isLoading && flashcards.length > 0 ? this.showFlashcard(): <p>Loading...</p>}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards,
    isLoading: state.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentlyLoading: () => dispatch(isLoading(true)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardSingle);


/*



*/
