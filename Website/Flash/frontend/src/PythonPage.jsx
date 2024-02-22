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
      
      {selectedLevel === null ? (
        <div className='button-container'>
          <button className='custom-button' onClick={() => handleLevelSelect('beginner')}>Beginner</button>
          <button className='custom-button' onClick={() => handleLevelSelect('moderate')}>Moderate</button>
          <button className='custom-button' onClick={() => handleLevelSelect('expert')}>Expert</button>
        </div>
      ) : (
        <>
          {selectedLevel === 'beginner' && <BeginnerQuizPython />}
          {selectedLevel === 'moderate' && <ModerateQuizPython />}
          {selectedLevel === 'expert' && <ExpertQuizPython />}
        </>
      )}

      {selectedLevel === null && <p>Select a level to start the quiz.</p>}
    </div>
  );
}

export default PythonPage;
