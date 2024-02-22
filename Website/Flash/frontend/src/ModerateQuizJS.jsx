import React, { useState } from 'react';
import './Python.css';

function ModerateQuizJS() {
  const questions = [
    {
      question: '1. What does the `let` keyword do in JavaScript?',
      options: ['Declares a block-scoped variable', 'Declares a global variable', 'Declares a constant variable', 'Declares a function'],
      correctAnswer: 'Declares a block-scoped variable'
    },
    {
      question: '2. How do you declare a function expression in JavaScript?',
      options: ['function myFunction() {}', 'myFunction = function() {}', 'const myFunction = function() {}', 'let myFunction = function() {}'],
      correctAnswer: 'const myFunction = function() {}'
    },
    {
      question: '3. What is the purpose of the `this` keyword in JavaScript?',
      options: ['Refers to the current object', 'Refers to the parent object', 'Refers to the global object', 'Refers to the child object'],
      correctAnswer: 'Refers to the current object'
    },
    {
      question: '4. What is the result of `console.log("5" - 3)`?',
      options: ['2', '8', '53', 'Error'],
      correctAnswer: '2'
    },
    {
      question: '5. Which method is used to add elements to the end of an array in JavaScript?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswer: 'push()'
    },
    {
      question: '6. What does the `typeof` operator return for an array in JavaScript?',
      options: ['array', 'object', 'array', 'string'],
      correctAnswer: 'object'
    },
    {
      question: '7. How do you check if a variable is an array in JavaScript?',
      options: ['typeof', 'isArray()', 'instanceof', 'isArray'],
      correctAnswer: 'Array.isArray()'
    },
    {
      question: '8. What is the result of `console.log(NaN === NaN)`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '9. What does the `!==` operator do in JavaScript?',
      options: ['Not equal value or not equal type', 'Equal value and equal type', 'Not equal value but equal type', 'Equal value but not equal type'],
      correctAnswer: 'Not equal value or not equal type'
    },
    {
      question: '10. What is the result of `console.log(Boolean("false"))`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
    },
    {
      question: '11. How do you convert a string to uppercase in JavaScript?',
      options: ['toUpperCase()', 'toUppercase()', 'toUpperCaseCase()', 'upperCase()'],
      correctAnswer: 'toUpperCase()'
    },
    {
      question: '12. What is the output of `console.log(Math.floor(3.9))`?',
      options: ['3', '4', '3.9', 'Error'],
      correctAnswer: '3'
    },
    {
      question: '13. What does the `concat()` method do in JavaScript?',
      options: ['Joins two or more arrays', 'Returns the first element of an array', 'Sorts the elements of an array', 'Returns a new array with elements added to it'],
      correctAnswer: 'Joins two or more arrays'
    },
    {
      question: '14. What is the result of `console.log(parseInt("10px"))`?',
      options: ['10', 'NaN', 'Error', 'null'],
      correctAnswer: '10'
    },
    {
      question: '15. Which event is triggered when the user scrolls in JavaScript?',
      options: ['scroll', 'scrollEvent', 'scrolling', 'onScroll'],
      correctAnswer: 'scroll'
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className='JavaScript-quiz'>
      <div className='quiz-container'>
        {currentQuestionIndex < questions.length ? (
          <>
            <div className='question'>{questions[currentQuestionIndex].question}</div>
            <div className='options'>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} className='custom-button' onClick={() => handleAnswerSelect(option)}>{option}</button>
              ))}
            </div>
          </>
        ) : (
          <div className='end-message'>Quiz completed! Your score: {score} out of {questions.length}</div>
        )}
      </div>
    </div>
  );
}

export default ModerateQuizJS;
