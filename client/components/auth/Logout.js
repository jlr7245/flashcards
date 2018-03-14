import React from 'react';
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Logout = props => {
  return (
    <div>
      {props.logoutUser()}
      <Redirect push to='/' />
      <p>Logging out...</p>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Logout);

