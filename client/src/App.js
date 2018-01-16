import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import FlashcardList from './components/FlashcardList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flashcards: [],
      flashcardsLoading: true,
      hasErrored: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get('/flashcards')
      .then(res => {
        if (res.statusText !== 'OK') {
          return this.setState({
            hasErrored: true,
          });
        }
        this.setState({
          flashcards: res.data.data.flashcards,
          flashcardsLoading: false,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {!this.state.flashcardsLoading ? (
          <FlashcardList flashcards={this.state.flashcards} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
