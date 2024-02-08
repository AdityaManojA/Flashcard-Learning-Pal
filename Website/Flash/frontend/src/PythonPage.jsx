import React, { useState } from 'react';
import BeginnerQuizPython from './BeginnerQuizPython';
import ModerateQuizPython from './ModerateQuizPython';
import ExpertQuizPython from './ExpertQuizPython';

function PythonPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div>
      <h1>Python Quiz</h1>
      <div>
        <button onClick={() => handleLevelSelect('beginner')}>Beginner</button>
        <button onClick={() => handleLevelSelect('moderate')}>Moderate</button>
        <button onClick={() => handleLevelSelect('expert')}>Expert</button>
      </div>
      {selectedLevel === 'beginner' && <BeginnerQuizPython />}
      {selectedLevel === 'moderate' && <ModerateQuizPython />}
      {selectedLevel === 'expert' && <ExpertQuizPython />}
    </div>
  );
}

export default PythonPage;
