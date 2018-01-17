import React, { Component } from 'react';

class FlashcardsContainer extends Component {

  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    return (
      <h1>Here is your flashcards container</h1>
    )
  }
}

export default FlashcardsContainer;
