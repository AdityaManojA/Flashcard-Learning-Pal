import React, { useState } from 'react';
import './Python.css';

function PythonQuizPage() {
  const questions = [
    {
      question: '1. What is the result of 5 * 3?',
      options: ['8', '15', '53', 'Error'],
      correctAnswer: '15'
    },
    {
      question: '2. What will the following code output?\n\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[-1])',
      options: ['banana', 'apple', 'cherry', 'IndexError'],
      correctAnswer: 'cherry'
    },
    {
      question: '3. What is the correct way to declare a tuple in Python?',
      options: ['(1, 2, 3)', '[1, 2, 3]', '{1, 2, 3}', '<1, 2, 3>'],
      correctAnswer: '(1, 2, 3)'
    },
    {
      question: '4. What will be the output of the following code snippet?\n\nx = "python"\nprint(len(x))',
      options: ['5', '6', '7', 'Error'],
      correctAnswer: '6'
    },
    {
      question: '5. Which of the following is a correct way to comment multiple lines in Python?',
      options: ['# Comment', '/* Comment */', '// Comment', '"""""" Comment """"""'],
      correctAnswer: '"""""" Comment """"""'
    },
    {
      question: '6. What will the following code output?\n\nx = 10\ny = 5\nprint(x % y)',
      options: ['2', '0', '1', 'Error'],
      correctAnswer: '0'
    },
    {
      question: '7. What will be the output of the following code snippet?\n\nx = "hello"\nprint(x[1:3])',
      options: ['h', 'e', 'el', 'Error'],
      correctAnswer: 'el'
    },
    {
      question: '8. What is the result of the expression (10 + 3) / 2?',
      options: ['6', '6.5', '7', 'Error'],
      correctAnswer: '6.5'
    },
    {
      question: '9. Which of the following is used to generate random numbers in Python?',
      options: ['rand()', 'random.randint()', 'randomNumber()', 'randomNum()'],
      correctAnswer: 'random.randint()'
    },
    {
      question: '10. What will be the output of the following code snippet?\n\nx = [1, 2, 3]\nx.append(4)\nprint(x)',
      options: ['[1, 2, 3, 4]', '[1, 2, 3]', '[1, 2, 3, [4]]', 'Error'],
      correctAnswer: '[1, 2, 3, 4]'
    },
    {
      question: '11. What is the output of the following code snippet?\n\nx = "Hello"\nprint(x.lower())',
      options: ['hello', 'HELLO', 'hELLO', 'Error'],
      correctAnswer: 'hello'
    },
    {
      question: '12. What will the following code output?\n\nx = [1, 2, 3, 4]\nprint(x[-2])',
      options: ['3', '4', '2', 'Error'],
      correctAnswer: '3'
    },
    {
      question: '13. What is the correct way to check if a key exists in a dictionary in Python?',
      options: ['key.exists()', 'exists(key)', 'key in dict', 'key.exists(dict)'],
      correctAnswer: 'key in dict'
    },
    {
      question: '14. What will the following code output?\n\nx = 10\ny = "20"\nprint(x + int(y))',
      options: ['30', '1020', 'Error', '102'],
      correctAnswer: '30'
    },
    {
      question: '15. Which of the following is used to format strings in Python?',
      options: ['format()', 'printf()', 'String.format()', 'formatString()'],
      correctAnswer: 'format()'
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
