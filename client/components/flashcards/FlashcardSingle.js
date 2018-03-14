import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { getFlashcardKeywords } from '../../actions/keywords';

import Keywords from '../partials/Keywords';

class FlashcardSingle extends Component {
  componentDidMount() {
    console.log('MOUNT ===========>>>>>>>')
    this.props.getFlashcardKeywords(this.props.id);
  }
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
    const { isLoading, flashcards, keywords } = this.props;
    return (
      <div className="flashcard-single-container">
        {!isLoading && flashcards.length > 0 ? this.showFlashcard(): <p>Loading...</p>}
        {!isLoading && <Keywords keywords={keywords.currentKeywords} />}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards,
    isLoading: state.isLoading,
    keywords: state.keywords,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlashcardKeywords: (id) => dispatch(getFlashcardKeywords(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardSingle);


/*



*/
