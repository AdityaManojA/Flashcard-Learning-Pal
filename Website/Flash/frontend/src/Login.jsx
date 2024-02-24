import React from 'react';
import './login.css'; // You can add your additional CSS styles here

const Login = () => {
  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
        </div>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <a href="/Signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
