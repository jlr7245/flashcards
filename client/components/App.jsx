import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    fetch('/flashcards')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>Hello World!!!</div>
    );
  }
}

export default App;
