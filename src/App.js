import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// TODO: update for workout/workout class

import Navbar from './components/navbar.component';
import WorkoutClassList from './components/workout-classlist.component';
import EditClass from './components/edit-workout-class.component';
import CreateWorkoutClass from './components/create-workout-class.component';
import CreateUser from './components/create-user.component';
import LoginUser from './components/login-user.component';
import LogoutUser from './components/logout-user.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    const username = this.state.username;
    const loggedIn = this.state.loggedIn;
    let greeting;
    if (loggedIn !== false && username.length > 0) {
      greeting = <div>Hello {username}</div>;
    } else {
      greeting = <div>Hello! Please use the login function</div>;
    }
    return (
      <Router>
        <Navbar loggedIn={loggedIn} username={username} />
        <br />
        <div className="container-fluid">
          {greeting}
          <Route path="/" exact component={WorkoutClassList} />
          <Route path="/edit/:id" component={EditClass} />
          <Route path="/create" component={CreateWorkoutClass} />
          <Route path="/signup" component={CreateUser} />
          <Route
            path="/login"
            render={(props) => (
              <LoginUser {...props} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <LogoutUser {...props} updateUser={this.updateUser} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
