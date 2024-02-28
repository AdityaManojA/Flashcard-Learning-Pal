// import React, { useState, useEffect } from 'react';
// import Q1 from '../../backend/q1'; 

// function BeginnerQuizPython() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     setQuestions(Q1);
  
//     setLoading(false);
//   }, []);

//   const handleAnswerSelect = (selectedAnswer) => {
//     const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
//     if (isCorrect) {
//       setScore(prevScore => prevScore + 1);
//     }
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//   };

//   if (loading) {
//     return <div>Loading... </div>;
//   }

//   return (
//     <div className='Python-quiz'>
//       <div className='quiz-container'>
//         {questions.length > 0 && currentQuestionIndex < questions.length ? (
//           <>
//             <div className='question'>{questions[currentQuestionIndex].question}</div>
//             <div className='options'>
//               {shuffleArray([...questions[currentQuestionIndex].options]).map((option, index) => (
//                 <button key={index} className='custom-button' onClick={() => handleAnswerSelect(option)}>{option}</button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className='end-message'>Quiz completed! Your score: {score} out of {questions.length}</div>
//         )}
//       </div>
//     </div>
//   );
// }

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// export default BeginnerQuizPython;
import React from 'react'

export default function BeginnerQuizPython() {
  return (
    <div>BeginnerQuizPython</div>
  )
}
