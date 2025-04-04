import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Signup.css';

export default function Signup() {
  const [data, setData] = useState({
    Name: "",
    Password: "",
    Age: 0
  });
  const navigate=useNavigate();

  function x(evt) {
    setData({ ...data, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/loginusers', data)
      .then((res) => alert("Signup Successful"))
      .then(navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <h2>Create a New Account</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="signup-form">
        <div className="form-group">
          <label htmlFor="Name">New Client Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={data.Name}
            onChange={x}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={data.Password}
            onChange={x}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Age">Age</label>
          <input
            type="number"
            id="Age"
            name="Age"
            value={data.Age}
            onChange={x}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
}
