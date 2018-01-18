import React, { Component } from 'react';
import { fetchAllFlashcards } from '../actions/flashcards';
import { connect } from 'react-redux';

import FlashcardList from './FlashcardList';
import FlashcardSingle from './FlashcardSingle';
import Modal from './partials/Modal';

class FlashcardsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllFlashcards();
  }

  showModal(id) {
    const { flashcards } = this.props;
    return (
      <Modal>
        <FlashcardSingle id={id} />
      </Modal>
    )
  }
  render() {
    const { flashcards, isLoading, showModal = false } = this.props;
    return (
      <div>
        {(!showModal && !isLoading) && <FlashcardList flashcards={flashcards} />}
        {(showModal && !isLoading) && this.showModal(this.props.match.params.id)}
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
