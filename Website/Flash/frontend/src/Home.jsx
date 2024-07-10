import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="home-page">
      <h1 className="welcome">
        <br></br>
        Welcome to FLASH CARD PAL
      </h1>
      <br></br>
      <br></br>

      <p className="welcome">
        Unlock a new world of learning with FLASH CARD PAL! Our platform transforms the way you acquire new skills, making it enjoyable, effective, and accessible for everyone. Dive into a vast collection of customizable flashcards, engage with interactive quizzes, and join a vibrant community of learners. Whether you're a beginner or an advanced user, our tools are designed to cater to your specific needs, ensuring a personalized and enriching learning experience. Start your journey today and let FLASH CARD PAL guide you towards achieving your language learning goals.
      </p>

      <div className="buttonka">
        <Link to="/courses">
          <button className="ui-btn">
            <span>START LEARNING! </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
