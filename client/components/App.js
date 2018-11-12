import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './partials/Header';
import Home from './Home';
import FlashcardsContainer from './flashcards/FlashcardsContainer';
import CarouselPage from './carouselpage/CarouselPage'

import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';

import Dash from './user/Dash';

import { getAuthStatus } from '../actions/auth';

import '../styles/reset.css';
import '../styles/style.css';

class App extends Component {
  componentDidMount() {
    this.props.getAuthStatus();
  }
  render() {
    return (
      <div className="app">
        <Header auth={this.props.auth} />
        <main>
          <Route exact path="/" component={Home} />

          <Route exact path="/flashcards" component={FlashcardsContainer} />
          <Route
            exact
            path="/flashcards/:id"
            render={props => <FlashcardsContainer {...props} showModal />}
          />

          <Route exact path="/carousel" component={CarouselPage} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/dash" component={Dash} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getAuthStatus: () => dispatch(getAuthStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
