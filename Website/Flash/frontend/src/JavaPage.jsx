import React, { useState } from 'react';
import BeginnerQuizJava from './BeginnerQuizJava';
import ModerateQuizJava from './ModerateQuizJava';
import ExpertQuizJava from './ExpertQuizJava';
import './java.css';

function JavaPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className='Java-quiz'>
      <h1>Java Quiz</h1>
      <div className='button-container'>
        {/* Only render buttons if no level is selected */}
        {selectedLevel === null && (
          <>
            <button className='custom-button' onClick={() => handleLevelSelect('beginner')}>Beginner</button>
            <button className='custom-button' onClick={() => handleLevelSelect('moderate')}>Moderate</button>
            <button className='custom-button' onClick={() => handleLevelSelect('expert')}>Expert</button>
          </>
        )}
      </div>
      {/* Render quiz component based on selectedLevel */}
      {selectedLevel === 'beginner' && <BeginnerQuizJava />}
      {selectedLevel === 'moderate' && <ModerateQuizJava />}
      {selectedLevel === 'expert' && <ExpertQuizJava />}
    </div>
  );
}

export default JavaPage;
