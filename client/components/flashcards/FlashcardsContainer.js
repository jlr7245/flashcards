import React, { Component } from 'react';
import { fetchAllFlashcards } from '../../actions/flashcards';
import { connect } from 'react-redux';

import FlashcardList from './FlashcardList';
import FlashcardSingle from './FlashcardSingle';
import Modal from '../partials/Modal';
import Keywords from '../partials/Keywords';

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
    const { flashcards, isLoading, showModal = false, keywords } = this.props;
    return (
      <div>
        {(!showModal && !isLoading) && (
          <React.Fragment>
            <FlashcardList flashcards={flashcards} />
            <Keywords keywords={keywords.allKeywords} />
          </React.Fragment>
        )}
        {(showModal && !isLoading) && this.showModal(this.props.match.params.id)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards,
    isLoading: state.isLoading,
    keywords: state.keywords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllFlashcards: () => dispatch(fetchAllFlashcards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);
