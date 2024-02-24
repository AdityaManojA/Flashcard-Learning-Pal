import React, { useState } from 'react';
import './login.css'; // You can add your additional CSS styles here
import { Link } from 'react-router-dom'; 

const Signup = () => {
  // State to hold the selected option
  const [role, setRole] = useState('');

  // Function to handle dropdown change
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Signup here</h3>

        <label htmlFor="Name">Name</label>
        <input type="text" placeholder="Name" id="Name" />

        <label htmlFor="Username">Email</label>
        <input type="text" placeholder="Email" id="Username" />

        <label htmlFor="Password">Password</label>
        <input type="password" placeholder="Password" id="Password" />

        <button>Sign up</button>
        <div className="signup-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
