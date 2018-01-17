import React, { Component } from 'react';
import { fetchAllFlashcards } from '../actions/flashcards';
import { connect } from 'react-redux';

import FlashcardList from './FlashcardList';

class FlashcardsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllFlashcards();
  }
  render() {
    const { flashcards, isLoading } = this.props;
    return (
      <div>
        <h1>Here is your flashcards container</h1>
        {!isLoading && <FlashcardList flashcards={flashcards} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllFlashcards: () => dispatch(fetchAllFlashcards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);
