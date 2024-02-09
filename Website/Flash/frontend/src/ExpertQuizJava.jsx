import React, { useState } from 'react';
import './Java.css';

function ExpertQuizJava() {
  const questions = [
    {
      question: '1. What is the output of `System.out.println("Java".indexOf("v"))`?',
      options: ['1', '2', '-1', 'Error'],
      correctAnswer: '2'
    },
    {
      question: '2. What is the output of `System.out.println(3 << 2)`?',
      options: ['12', '6', '8', 'Error'],
      correctAnswer: '12'
    },
    {
      question: '3. What is the output of `System.out.println(10 >> 1)`?',
      options: ['5', '20', '2', 'Error'],
      correctAnswer: '5'
    },
    {
      question: '4. What is the result of `System.out.println("Hello".charAt(0))`?',
      options: ['Hello', 'h', 'Error', 'null'],
      correctAnswer: 'H'
    },
    {
      question: '5. Which of the following statements is used to exit a loop in Java?',
      options: ['break', 'continue', 'exit', 'return'],
      correctAnswer: 'break'
    },
    {
      question: '6. What is the output of `System.out.println(Math.ceil(5.1))`?',
      options: ['5', '6', '5.1', 'Error'],
      correctAnswer: '6'
    },
    {
      question: '7. Which of the following collections in Java guarantees no duplicate elements?',
      options: ['HashSet', 'ArrayList', 'LinkedList', 'TreeMap'],
      correctAnswer: 'HashSet'
    },
    {
      question: '8. What is the output of `System.out.println(Math.min(1.0, 2))`?',
      options: ['1.0', '1', '2', 'Error'],
      correctAnswer: '1.0'
    },
    {
      question: '9. What is the purpose of the `super` keyword in Java?',
      options: ['Access parent class methods and fields', 'Access child class methods and fields', 'Exit current method', 'Exit current loop'],
      correctAnswer: 'Access parent class methods and fields'
    },
    {
      question: '10. What is the output of `System.out.println(Math.pow(2, 3))`?',
      options: ['8', '6', '2^3', 'Error'],
      correctAnswer: '8.0'
    },
    {
      question: '11. Which of the following Java collection interfaces represents an ordered collection of elements?',
      options: ['List', 'Set', 'Map', 'Collection'],
      correctAnswer: 'List'
    },
    {
      question: '12. What is the output of `System.out.println("Java".equals("java"))`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '13. Which of the following Java annotations is used to mark a method as deprecated?',
      options: ['@Deprecated', '@DeprecatedMethod', '@Obsolete', '@Deprecate'],
      correctAnswer: '@Deprecated'
    },
    {
      question: '14. What is the output of `System.out.println("Hello".concat(" World"))`?',
      options: ['Hello World', 'Hello', ' World', 'Error'],
      correctAnswer: 'Hello World'
    },
    {
      question: '15. What is the output of `System.out.println(10 / 0)`?',
      options: ['Infinity', '0', 'Error', 'null'],
      correctAnswer: 'Error'
    }
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
    <div className='Java-quiz'>
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

export default ExpertQuizJava;
