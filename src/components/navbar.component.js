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
    let userName;
    if (this.props.userName !== null) {
      userName = (
        <li className="navbar-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
      );
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Hands Off Training
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarToggler">
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
            {userName}
            {loggedInStatus}
          </ul>
        </div>
      </nav>
    );
  }
}
