import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';

import Header from './partials/Header';
import Footer from './partials/Footer';

import Home from './Home';
import FlashcardsContainer from './FlashcardsContainer';


class App extends Component {
  componentDidMount() {
    fetch('/flashcards')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/flashcards" component={FlashcardsContainer} />
          <Route exact path="/flashcards/:id" component={FlashcardsContainer} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
