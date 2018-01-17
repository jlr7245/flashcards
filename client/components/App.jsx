import React, { Component } from 'react';

import Header from './partials/Header';
import Footer from './partials/Footer';


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
        <Footer />
      </div>
    );
  }
}

export default App;
