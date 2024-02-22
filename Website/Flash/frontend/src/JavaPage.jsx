import React, { useState } from 'react';
import BeginnerQuizJava from './BeginnerQuizJava';
import ModerateQuizJava from './ModerateQuizJava';
import ExpertQuizJava from './ExpertQuizJava';
import './Python.css';

function JavaPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className='Python-quiz'>
      <h1>Java Quiz</h1>

      

        {selectedLevel === null ? (
          <div className='button-container'>
            <button className='custom-button' onClick={() => handleLevelSelect('beginner')}>Beginner</button>
            <button className='custom-button' onClick={() => handleLevelSelect('moderate')}>Moderate</button>
            <button className='custom-button' onClick={() => handleLevelSelect('expert')}>Expert</button>
          </div>
        ) :(
       <>
      
      {selectedLevel === 'beginner' && <BeginnerQuizJava />}
      {selectedLevel === 'moderate' && <ModerateQuizJava />}
      {selectedLevel === 'expert' && <ExpertQuizJava />}

      </>
        )}
      {selectedLevel === null && <p>Select a level to start the quiz.</p>}
        </div>
  );
}

export default JavaPage;
