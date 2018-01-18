import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
  }

  render() {
    const { name, password } = this.state;
    return (
      <div className="loginform">
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="name" placeholder="name" onChange={this.handleChange} value={name} />
          <input type="password" name="password" placeholder="password" onChange={this.handleChange} password={password} />
          <input type="submit" value="Log in!" />
        </form>
      </div>
    )
  }
}

export default Login;
