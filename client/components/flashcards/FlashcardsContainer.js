import React, { Component } from 'react';
import { fetchFlashcardSet } from '../../actions/flashcards';
import { connect } from 'react-redux';
import queryString from 'query-string'

import FlashcardList from './FlashcardList';
import FlashcardSingle from './FlashcardSingle';
import Modal from '../partials/Modal';
import Keywords from '../partials/Keywords';
import ScrollLoader from '../partials/ScrollLoader';

class FlashcardsContainer extends Component {
  componentDidMount() {
    const { fetchFlashcardSet, location } = this.props
    const values = queryString.parse(location.search)
    console.warn(values)
    console.warn(this.props)
    fetchFlashcardSet()
  }

  showModal(id) {
    const { flashcards } = this.props;
    return (
      <Modal>
        <FlashcardSingle id={id} />
      </Modal>
    )
  }

  setRef = (elem, name) => {
    this[name] = elem
  }

  setFocus = name => {
    event.preventDefault()
    this[name].focus()
  }

  render() {
    const { flashcards, isLoading, showModal = false, keywords, offset, history } = this.props;
    return (
      <div>
        {(!showModal && !(flashcards.length < 0)) && (
          <ScrollLoader onHitBottom={this.props.fetchFlashcardSet} isLoading={isLoading}               setFocus={this.setFocus} history={history}>
            <FlashcardList
              flashcards={flashcards}
              offset={offset}
              setRef={this.setRef}
            />
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
    offset: state.offset.offset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlashcardSet: () => dispatch(fetchFlashcardSet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);
