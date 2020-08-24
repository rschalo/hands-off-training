import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    let loggedInStatus;
    if (this.props.loggedIn) {
      loggedInStatus = (
        <li className="navbar-item">
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      );
    } else {
      loggedInStatus = (
        <li className="navbar-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      );
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Hands Off Training
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Workout Classes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Workout Class
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            {loggedInStatus}
          </ul>
        </div>
      </nav>
    );
  }
}
