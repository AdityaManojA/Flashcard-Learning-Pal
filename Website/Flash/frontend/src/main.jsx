import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import Courses from './Courses.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import PythonPage from './PythonPage.jsx';
import JavaPage from './JavaPage.jsx';
import JavaScriptPage from './JavaScriptPage.jsx';
import ModerateQuizPython from './ModerateQuizPython.jsx';
import BeginnerQuizPython from './BeginnerQuizPython.jsx';
import ExpertQuizPython from './ExpertQuizPython.jsx';
import ModerateQuizJS from './ModerateQuizJS.jsx';
import BeginnerQuizJS from './BeginnerQuizJS.jsx';
import ExpertQuizJS from './ExpertQuizJS.jsx';
import ModerateQuizJava from './ModerateQuizJava.jsx';
import BeginnerQuizJava from './BeginnerQuizJava.jsx';
import ExpertQuizJava from './ExpertQuizJava.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx'
import BackgroundAnimation from './BackgroundAnimation.jsx'; // Import the BackgroundAnimation component
import './index.css';
import './Styles.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className='flashcard'><a href="/">FLASH CARD PAL</a></h1>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <BackgroundAnimation /> 
      <Routes>
      
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/python" element={<PythonPage />} /> 
        <Route path="/courses/python/beginner" element={<BeginnerQuizPython />} /> 
        <Route path="/courses/python/moderate" element={<ModerateQuizPython />} />
        <Route path="/courses/python/expert" element={<ExpertQuizPython />} />
        <Route path="/courses/javascript" element={<JavaScriptPage />} />
        <Route path="/courses/javascript/beginner" element={<BeginnerQuizJS />} /> 
        <Route path="/courses/javascript/moderate" element={<ModerateQuizJS />} />
        <Route path="/courses/javascript/expert" element={<ExpertQuizJS />} />
        <Route path="/courses/javas/beginner" element={<BeginnerQuizJava />} /> 
        <Route path="/courses/java/moderate" element={<ModerateQuizJava />} />
        <Route path="/courses/java/expert" element={<ExpertQuizJava />} />
        <Route path="/courses/java" element={<JavaPage />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default Login;
