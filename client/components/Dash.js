import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUserProfile } from '../actions/user';
import { isLoading as load } from '../actions/is-loading';

import FlashcardList from './FlashcardList';

class Dash extends Component {
  componentDidMount() {
    if (!this.props.user.hasOwnProperty('flashcards')) this.props.fetchUserProfile();
  }
  render() {
    const { auth, user, isLoading } = this.props;
    return (
      <div>
        {!auth && <Redirect push to="/login" />}
        {isLoading || !user.flashcards ? <p>Loading...</p> : <FlashcardList flashcards={user.flashcards} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  load: () => dispatch(load(true)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
