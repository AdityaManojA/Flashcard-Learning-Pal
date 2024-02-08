import React, { useState } from 'react';
import BeginnerQuizPython from './BeginnerQuizPython';
import ModerateQuizPython from './ModerateQuizPython';
import ExpertQuizPython from './ExpertQuizPython';
import './python.css';

function PythonPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className='Python-quiz'>
      <h1>Python Quiz</h1>
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
      {selectedLevel === 'beginner' && <BeginnerQuizPython />}
      {selectedLevel === 'moderate' && <ModerateQuizPython />}
      {selectedLevel === 'expert' && <ExpertQuizPython />}
    </div>
  );
}

export default PythonPage;
