import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Home = props => {
  return (
    <div className="home">
      Welcome to Code Flashcards!
      <button onClick={() => props.changePage()}>See Flashcards</button>
    </div>
  );
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    changePage: () => push('/flashcards'),
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(Home);
