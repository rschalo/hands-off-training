import React from 'react';
import axios from 'axios';

export default function Logout() {
  function onSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:5000/users/logout')
      .then((res) => console.log(res.data));
  }
  return (
    <div>
      <h3>Logout User</h3>
      <form onSubmit={onSubmit}>
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
