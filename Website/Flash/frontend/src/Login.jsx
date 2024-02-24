import React, { useState } from 'react';
import './login.css';
import '/card.svg'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
  };

  return (
    <div className="screen-1">
      <img src={cardSvg} alt="Card" /> {/* Render the SVG using an <img> tag */}
      <div className="email">
        <label htmlFor="email">Email</label>
        <div className="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="email"
            name="email"
            placeholder="Username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <div className="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            className="pas"
            type="password"
            name="password"
            placeholder="············"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ion-icon className="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>
      <button className="login" onClick={handleSubmit}>
        Login
      </button>
      <div className="footer">
        <span>Sign up</span>
        <span>Forgot Password?</span>
      </div>
    </div>
  );
};

export default Login;
