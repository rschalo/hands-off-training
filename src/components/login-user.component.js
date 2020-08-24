import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      warningMessage: null,
      redirectTo: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(newUser);
    axios
      .post('http://localhost:5000/users/login', newUser)
      .then((response) => {
        console.log('login response: ');
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({ redirectTo: '/' });
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
        this.setState({ warningMessage: 'Invalid login, try again' });
      });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <h3>Login User</h3>
          {this.state.warningMessage}
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                required
                id="username"
                className="form-control"
                value={this.state.username}
                onChange={(e) => this.handleUsername(e)}
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                required
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.handlePassword(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Login User"
                disabled={!this.validateForm()}
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
