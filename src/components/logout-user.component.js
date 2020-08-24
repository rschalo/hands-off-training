import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:5000/users/logout')
      .then((response) => {
        console.log('logout response: ');
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
          // update the state to redirect to home
          this.setState({ redirectTo: '/' });
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathanme: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <h3>Logout User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="submit"
                value="Logout User"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
