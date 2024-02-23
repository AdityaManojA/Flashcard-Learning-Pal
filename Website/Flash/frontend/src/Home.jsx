import './App.css';
import React from 'react';
import { Link } from 'react-router-dom'; 

function App() {
  return (
    <div className='home-page'>
      <h1 className='welcome'>
      <br></br>
        Welcome to FLASH CARD PAL
      </h1>
      <p className='welcome'>Start your journey to learn a new programming language today.</p>

     <div className='buttonka'>
      <Link to="/courses">
      <button className="ui-btn">
          <span>
              Go to Courses
          </span>
      </button>
      </Link>
      </div>
    </div>
  );
}

export default App;
