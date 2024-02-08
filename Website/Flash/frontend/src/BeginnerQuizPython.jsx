import React, { useState } from 'react';
import './python.css';

function PythonQuizPage() {
  const questions = [
    {
      question: '1. What is the output of the following code snippet?\n\nx = 5\ny = 3\nprint(x + y)',
      options: ['8', '15', '53', 'Error'],
      correctAnswer: '8'
    },
    {
      question: '2. What will the following code output?\n\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[1])',
      options: ['banana', 'apple', 'cherry', 'IndexError'],
      correctAnswer: 'banana'
    },
    {
      question: '3. What is the correct syntax to create a function in Python?',
      options: ['function myFunction():', 'def myFunction():', 'create myFunction():', 'function = myFunction():'],
      correctAnswer: 'def myFunction():'
    },
    {
      question: '4. What is the result of 2 ** 3 in Python?',
      options: ['6', '8', '9', '16'],
      correctAnswer: '8'
    },
    {
      question: '5. What will be the output of the following code snippet?\n\nfor i in range(1, 5):\n  print(i)',
      options: ['1\n2\n3\n4', '1\n2\n3\n4\n5', '0\n1\n2\n3\n4', '1\n2\n3\n4\n5\n6'],
      correctAnswer: '1\n2\n3\n4'
    },
    {
      question: '6. What data type is the result of the expression 3 + 2.5?',
      options: ['int', 'float', 'str', 'bool'],
      correctAnswer: 'float'
    },
    {
      question: '7. What will the following code output?\n\nx = "Hello"\nprint(x[1])',
      options: ['H', 'e', 'l', 'o'],
      correctAnswer: 'e'
    },
    {
      question: '8. What is the output of the following code snippet?\n\nx = 10\ny = "10"\nprint(x + y)',
      options: ['20', '1010', 'Error', '101'],
      correctAnswer: 'Error'
    },
    {
      question: '9. Which of the following is NOT a valid variable name in Python?',
      options: ['my_var', 'myVar', 'MyVar', '2Var'],
      correctAnswer: '2Var'
    },
    {
      question: '10. What will the following code output?\n\nx = [1, 2, 3]\nprint(x[-1])',
      options: ['1', '2', '3', 'Error'],
      correctAnswer: '3'
    },
    {
      question: '11. What will be the output of the following code snippet?\n\nx = 5\ny = 2\nprint(x / y)',
      options: ['2.5', '2', '2.0', 'Error'],
      correctAnswer: '2.5'
    },
    {
      question: '12. Which of the following is used to define a comment in Python?',
      options: ['#', '//', '/* */', '--'],
      correctAnswer: '#'
    },
    {
      question: '13. What will the following code output?\n\nx = True\ny = False\nprint(not x or y)',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 'False'
    },
    {
      question: '14. What is the output of the following code snippet?\n\nx = [1, 2, 3]\nprint(x[3])',
      options: ['1', '2', '3', 'IndexError'],
      correctAnswer: 'IndexError'
    },
    {
      question: '15. What will the following code output?\n\nx = "python"\nprint(x.capitalize())',
      options: ['Python', 'python', 'PYTHON', 'pYTHON'],
      correctAnswer: 'Python'
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
