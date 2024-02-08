import React, { useState } from 'react';
import BeginnerQuizJS from './BeginnerQuizJS';
import ModerateQuizJS from './ModerateQuizJS';
import ExpertQuizJS from './ExpertQuizJS';
import './JS.css'; // Assuming you've renamed the CSS file to js.css

function JavaScriptPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className='JavaScript-quiz'>
      <h1 className='center'>JavaScript Quiz</h1>
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
      {selectedLevel === 'beginner' && <BeginnerQuizJS />}
      {selectedLevel === 'moderate' && <ModerateQuizJS />}
      {selectedLevel === 'expert' && <ExpertQuizJS />}
    </div>
  );
}

export default JavaScriptPage;
