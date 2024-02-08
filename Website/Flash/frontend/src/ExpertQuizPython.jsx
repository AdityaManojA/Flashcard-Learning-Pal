import React, { useState } from 'react';
import './python.css';

function PythonQuizPage() {
  const questions = [
    {
      question: '1. What is the output of the following code snippet?\n\nx = 5\ny = 3\nprint(x * y)',
      options: ['8', '15', '53', 'Error'],
      correctAnswer: '15'
    },
    {
      question: '2. What will the following code output?\n\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[-2])',
      options: ['banana', 'apple', 'cherry', 'IndexError'],
      correctAnswer: 'apple'
    },
    {
      question: '3. What is the correct way to declare a dictionary in Python?',
      options: ['{1: "one", 2: "two", 3: "three"}', '[1, 2, 3]', '("one", "two", "three")', '<1, 2, 3>'],
      correctAnswer: '{1: "one", 2: "two", 3: "three"}'
    },
    {
      question: '4. What is the output of the following code snippet?\n\nx = "python"\nprint(x[::-1])',
      options: ['python', 'nohtyp', 'pytho', 'Error'],
      correctAnswer: 'nohtyp'
    },
    {
      question: '5. What will be the output of the following code snippet?\n\nx = [1, 2, 3]\nprint(x[:-1])',
      options: ['[1, 2]', '[1, 2, 3]', '[2, 3]', '[1, 3]'],
      correctAnswer: '[1, 2]'
    },
    {
      question: '6. How can you remove all leading and trailing whitespace in a string variable `x` in Python?',
      options: ['x.trim()', 'x.strip()', 'strip(x)', 'x.clean()'],
      correctAnswer: 'x.strip()'
    },
    {
      question: '7. What is the output of the following code snippet?\n\nx = 5\ny = 2\nprint(x // y)',
      options: ['2.5', '2', '2.0', 'Error'],
      correctAnswer: '2'
    },
    {
      question: '8. Which of the following is a correct way to check if a key exists in a dictionary in Python?',
      options: ['if key in dictionary:', 'if key exists dictionary:', 'if dictionary has key:', 'if key is in dictionary:'],
      correctAnswer: 'if key in dictionary:'
    },
    {
      question: '9. What will be the output of the following code snippet?\n\nx = True\ny = False\nprint(x and y)',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 'False'
    },
    {
      question: '10. What is the output of the following code snippet?\n\nx = [1, 2, 3]\nprint(x[3])',
      options: ['1', '2', '3', 'IndexError'],
      correctAnswer: 'IndexError'
    },
    {
      question: '11. What will the following code output?\n\nx = "python"\nprint(x.capitalize())',
      options: ['Python', 'python', 'PYTHON', 'pYTHON'],
      correctAnswer: 'Python'
    },
    {
      question: '12. Which of the following is NOT a valid variable name in Python?',
      options: ['my_var', 'myVar', 'MyVar', '2Var'],
      correctAnswer: '2Var'
    },
    {
      question: '13. What will the following code output?\n\nx = [1, 2, 3]\nprint(x[-1])',
      options: ['1', '2', '3', 'Error'],
      correctAnswer: '3'
    },
    {
      question: '14. What is the result of the following code snippet?\n\nx = 10\ny = "10"\nprint(x + y)',
      options: ['20', '1010', 'Error', '101'],
      correctAnswer: 'Error'
    },
    {
      question: '15. What will the following code output?\n\nx = "Hello"\nprint(x[1])',
      options: ['H', 'e', 'l', 'o'],
      correctAnswer: 'e'
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
    <div className='Python-quiz'>
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

export default PythonQuizPage;
