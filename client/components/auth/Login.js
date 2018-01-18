import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { postToLogin } from '../../actions/auth';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postToLogin(this.state);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="form-page">
        <div className="add">
          <form onSubmit={this.handleSubmit} >
            <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={username} />
            <input type="password" name="password" placeholder="password" onChange={this.handleChange} password={password} />
            <input type="submit" value="Log in!" />
          </form>
          { (this.props.auth) && <Redirect push to="/dash" />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    auth: state.auth,
  });
};

const mapDispatchToProps = dispatch => {
  return {
    postToLogin: (data) => dispatch(postToLogin(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
