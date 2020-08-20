import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [usernameState, setUsername] = useState('');
  const [passwordState, setPassword] = useState('');
  const [redirectState, setRedirect] = useState('');

  function validateForm() {
    return usernameState.length > 0 && passwordState.length > 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: usernameState,
      password: passwordState
    };
    console.log(newUser);
    axios
      .post('http://localhost:5000/users/login', newUser)
      .then((res) => console.log(res.data));
    // Use immediately invoked function expression for state hooks to clear
    (() => {
      setPassword('');
      setUsername('');
      setRedirect('/');
    })();
  }
  if (redirectState !== '') {
    return <Redirect to={{ pathname: redirectState }} />;
  } else {
    return (
      <div>
        <h3>Login User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={usernameState}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={passwordState}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Login User"
              disabled={!validateForm()}
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
