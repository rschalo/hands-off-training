import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    this.login = this.login.bind(this);
  }

  login(username, password) {
    axios
      .post('/auth/login', {
        username,
        password
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }
  render() {
    return (
      <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={WorkoutClassList} />
        <Route path="/edit/:id" component={EditClass} />
        <Route path="/create" component={CreateWorkoutClass} />
        <Route path="/user" component={CreateUser} />
        <Route path="/login" component={LoginUser} login={this.login} />
        <Route path="/logout" component={LogoutUser} />
      </Router>
    );
  }
}

export default App;
