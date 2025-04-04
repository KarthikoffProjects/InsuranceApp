import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Loginpage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000/session', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          navigate('/');  // Redirect to homepage if already logged in
        }
      })
      .catch(err => console.error("Session check error:", err));
  }, [navigate]);
  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3000/login', { Name: username, Password: password }, { withCredentials: true })
      .then(res => {
        alert(`Welcome! ${username}`);
        navigate('/');  // Redirect after login
      })
      .catch(err => {
        setError('Invalid username or password');
        console.error("Login error:", err);
      });
  };

  return (
    <div className='loginpage'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Login</h3>
          <label>Client Name</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && (<p className='error-message'>{error}</p>)}
          <input className='login-btn' type="submit" value="Login" />
        </form>
        <button className='signup-btn' onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}
