import React from 'react';
import './login.css'; 
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <Link to='/home' className="login-button"> 
          Log In
        </Link>

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
