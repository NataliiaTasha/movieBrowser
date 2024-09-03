import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ closeSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Зберігаємо дані в localStorage
    localStorage.setItem('registeredUser', JSON.stringify({ email, password }));

    console.log('User registered:', { email, password });
    closeSignUp();  // Закриваємо модальне вікно після реєстрації
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;



