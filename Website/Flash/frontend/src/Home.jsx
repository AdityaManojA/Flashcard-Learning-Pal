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
        Welcome to our dynamic coding learning platform! Whether you're a
        beginner eager to dive into the world of programming or an experienced
        coder looking to sharpen your skills, you've come to the right place.
        Our comprehensive flashcard website offers a plethora of resources to
        enhance your coding journey. Challenge yourself with interactive
        quizzes, stay updated with informative blogs, and engage with our AI
        chatbot for personalized assistance. Join our vibrant community of
        learners today and embark on a rewarding path towards mastering coding
        languages. Let's code, learn, and grow together!
      </p>

      <div className="buttonka">
        <Link to="/courses">
          <button className="ui-btn">
            <span>Go to Courses</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
