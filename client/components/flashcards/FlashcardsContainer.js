import React, { Component } from 'react';
import { fetchFlashcardSet } from '../../actions/flashcards';
import { connect } from 'react-redux';

import FlashcardList from './FlashcardList';
import FlashcardSingle from './FlashcardSingle';
import Modal from '../partials/Modal';
import Keywords from '../partials/Keywords';
import ScrollLoader from '../partials/ScrollLoader';

class FlashcardsContainer extends Component {
  componentDidMount() {
    this.props.fetchFlashcardSet();
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
        {(!showModal && !(flashcards.length < 0)) && (
          <ScrollLoader onHitBottom={this.props.fetchFlashcardSet} isLoading={isLoading}>
            <FlashcardList flashcards={flashcards} />
          </ScrollLoader>
        )}
        {(showModal && !isLoading) && this.showModal(this.props.match.params.id)}
        {keywords.allKeywords.length && !showModal && <Keywords keywords={keywords.allKeywords} />}
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
    fetchFlashcardSet: () => dispatch(fetchFlashcardSet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);
