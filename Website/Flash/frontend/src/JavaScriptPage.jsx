import React, { useState } from 'react';
import BeginnerQuizJS from './BeginnerQuizJS';
import ModerateQuizJS from './ModerateQuizJS';
import ExpertQuizJS from './ExpertQuizJS';
import './Python.css'; 

function JavaScriptPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className='Python-quiz'>
      <h1 className='center'>JavaScript Quiz</h1>
      
       
        {selectedLevel === null ? (
          <div className='button-container'>
            <button className='custom-button' onClick={() => handleLevelSelect('beginner')}>Beginner</button>
            <button className='custom-button' onClick={() => handleLevelSelect('moderate')}>Moderate</button>
            <button className='custom-button' onClick={() => handleLevelSelect('expert')}>Expert</button>
          </div>
        ) :(
      <>
      {/* Render quiz component based on selectedLevel */}
      {selectedLevel === 'beginner' && <BeginnerQuizJS />}
      {selectedLevel === 'moderate' && <ModerateQuizJS />}
      {selectedLevel === 'expert' && <ExpertQuizJS />}
      {selectedLevel === null && <p>Select a level to start the quiz.</p>}
    </>
        )}
        </div>
  );
}

export default JavaScriptPage;
