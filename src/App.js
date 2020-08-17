import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: update for workout/workout class

import Navbar from './components/navbar.component';
import WorkoutClassList from './components/workout-classlist.component';
import EditClass from './components/edit-workout-class.component';
import CreateWorkoutClass from './components/create-workout-class.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={WorkoutClassList} />
      <Route path="/edit/:id" component={EditClass} />
      <Route path="/create" component={CreateWorkoutClass} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
