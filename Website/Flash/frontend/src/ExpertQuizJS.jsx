import React, { useState } from 'react';
import './python.css';

function ExpertQuizJS() {
  const questions = [
    {
      question: '1. What is the result of `console.log(+"5" + 3)`?',
      options: ['8', '53', 'Error', 'null'],
      correctAnswer: '8'
    },
    {
      question: '2. What does the `bind()` method do in JavaScript?',
      options: ['Creates a new array with the results of calling a function for every array element', 'Binds an event handler to a specific element', 'Creates a new function that, when called, has its `this` keyword set to the provided value', 'Returns the first element in the array that satisfies a provided testing function'],
      correctAnswer: 'Creates a new function that, when called, has its `this` keyword set to the provided value'
    },
    {
      question: '3. What is the output of `console.log(Math.max([10, 20, 30]))`?',
      options: ['10', '30', 'Error', 'null'],
      correctAnswer: 'NaN'
    },
    {
      question: '4. How do you declare a generator function in JavaScript?',
      options: ['function* myGenerator() {}', 'generator myGenerator() {}', 'const myGenerator = generator() {}', 'function generator() {}'],
      correctAnswer: 'function* myGenerator() {}'
    },
    {
      question: '5. What is the result of `console.log([10] == [10])`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '6. What does the `Symbol` data type represent in JavaScript?',
      options: ['A unique and immutable value', 'A reference to an object', 'A string that is automatically converted to a number', 'A special object type'],
      correctAnswer: 'A unique and immutable value'
    },
    {
      question: '7. What is the result of `console.log(5 == "5")`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
    },
    {
      question: '8. What does the `reduce()` method do in JavaScript?',
      options: ['Applies a function against an accumulator and each element in the array to reduce it to a single value', 'Returns a new array with all elements that pass a test', 'Reverses the order of the elements in an array', 'Removes the first element from an array and returns that element'],
      correctAnswer: 'Applies a function against an accumulator and each element in the array to reduce it to a single value'
    },
    {
      question: '9. What is the result of `console.log(5 === "5")`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '10. How do you define a private variable in JavaScript?',
      options: ['Using the `private` keyword', 'Inside a closure', 'Using the `var` keyword', 'By prefixing the variable name with an underscore'],
      correctAnswer: 'Inside a closure'
    },
    {
      question: '11. What does the `super` keyword do in JavaScript?',
      options: ['Refers to the current object', 'Calls the constructor of the parent class', 'Creates a new object', 'Throws an error'],
      correctAnswer: 'Calls the constructor of the parent class'
    },
    {
      question: '12. What is the result of `console.log(typeof null)`?',
      options: ['null', 'object', 'Error', 'null'],
      correctAnswer: 'object'
    },
    {
      question: '13. What does the `finally` block in a `try...catch...finally` statement do?',
      options: ['Executes if the code block inside `try` is successful', 'Executes if an error occurs in the code block inside `try`', 'Executes regardless of whether an error occurs or not', 'Returns a value from the function'],
      correctAnswer: 'Executes regardless of whether an error occurs or not'
    },
    {
      question: '14. What is the output of `console.log([] + [])`?',
      options: ['[]', 'NaN', 'undefined', 'Error'],
      correctAnswer: ''
    },
    {
      question: '15. What is the result of `console.log(undefined == null)`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
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

export default ExpertQuizJS;
