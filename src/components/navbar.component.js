import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: 'collapsed',
      ariaExpanded: 'false',
      topDiv: 'collapse'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.button === 'collapsed') {
      this.setState({
        button: '',
        ariaExpanded: 'true',
        topDiv: 'show'
      });
    } else {
      this.setState({
        button: 'collapsed',
        ariaExpanded: 'false',
        topDiv: 'collapse'
      });
    }
  }
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
          <Link to="/login" className="nav-link" onClick={this.handleClick}>
            Login
          </Link>
        </li>
      );
    }
    let createClass;
    let userName;
    if (this.props.userName !== null) {
      userName = (
        <li className="navbar-item">
          <Link to="/signup" className="nav-link" onClick={this.handleClick}>
            Sign Up
          </Link>
        </li>
      );
    }
    if (this.props.username === 'admin') {
      createClass = (
        <li className="navbar-item">
          <Link to="/create" className="nav-link" onClick={this.handleClick}>
            Create Workout Class
          </Link>
        </li>
      );
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand" onClick={this.handleClick}>
          Hands Off Training
        </Link>
        <button
          className={`navbar-toggler ${this.state.button}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded={this.state.ariaExpanded}
          aria-label="Toggle navigation"
          onClick={this.handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse ${this.state.topDiv}`}
          id="navbarToggler"
        >
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link" onClick={this.handleClick}>
                Workout Classes
              </Link>
            </li>
            {createClass}
            {userName}
            {loggedInStatus}
          </ul>
        </div>
      </nav>
    );
  }
}
