import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { postToRegister } from '../../actions/auth';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.postToRegister(this.state);
  }

  render() {
    const { username, password, email } = this.state;
    return (
      <div className="form-page">
        <div className="add" onSubmit={this.handleSubmit}>
          <form method="POST" action="/auth/register">
            <input
              name="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={this.handleChange}
              required
            />
            <input 
              name="email" 
              type="email" 
              placeholder="email" 
              value={email}
              onChange={this.handleChange}
              required />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <input type="submit" value="Register!" />
          </form>
        </div>
        {this.props.auth && <Redirect push to="/dash" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  postToRegister: data => dispatch(postToRegister(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
