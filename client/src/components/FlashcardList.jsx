import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flashcardsFetchData } from '../actions/flashcards'

class FlashcardList extends Component {
  componentDidMount() {
    this.props.fetchData('/flashcards');
  }

  render() {
    const { flashcards } = this.props;
    if (this.props.hasErrored) {
      return <p>Sorry! THere was an error</p>
    }
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }
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
}

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards,
    hasErrored: state.flashcardsHasErrored,
    isLoading: state.flashcardsIsLoading,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(flashcardsFetchData(url)),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(FlashcardList);