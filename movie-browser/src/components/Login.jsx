import React, { useState } from 'react'; 
import './Login.css';

function Login({ closeLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (registeredUser) {
      if (registeredUser.email === email && registeredUser.password === password) {
        console.log('Login successful');
        closeLogin();  
        setError('Invalid email or password');
      }
    } else {
      setError('No user found. Please sign up.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;


