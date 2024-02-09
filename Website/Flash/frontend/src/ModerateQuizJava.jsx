import React, { useState } from 'react';
import './Java.css';

function ModerateQuizJava() {
  const questions = [
    {
      question: '1. What is the output of `System.out.println("5" + 3)`?',
      options: ['53', '8', 'Error', 'null'],
      correctAnswer: '53'
    },
    {
      question: '2. What is the output of `System.out.println(5 / 2)`?',
      options: ['2.5', '2', '2.0', 'Error'],
      correctAnswer: '2'
    },
    {
      question: '3. What is the result of `System.out.println(5 == "5")`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '4. Which keyword is used to define a class in Java?',
      options: ['class', 'Class', 'define', 'java'],
      correctAnswer: 'class'
    },
    {
      question: '5. What is the output of `System.out.println("Java".substring(1, 3))`?',
      options: ['ava', 'Jav', 'Ja', 'Error'],
      correctAnswer: 'av'
    },
    {
      question: '6. Which of the following statements is used to create an object in Java?',
      options: ['new', 'malloc', 'object', 'create'],
      correctAnswer: 'new'
    },
    {
      question: '7. What is the purpose of the `finally` block in Java?',
      options: ['Execute code after try block', 'Execute code after catch block', 'Execute code before catch block', 'Execute code after both try and catch blocks'],
      correctAnswer: 'Execute code after both try and catch blocks'
    },
    {
      question: '8. What is the output of `System.out.println(3 * 2 + 1)`?',
      options: ['7', '9', '6', 'Error'],
      correctAnswer: '7'
    },
    {
      question: '9. Which data structure in Java provides a way to store elements in a sorted order?',
      options: ['TreeSet', 'HashSet', 'ArrayList', 'LinkedList'],
      correctAnswer: 'TreeSet'
    },
    {
      question: '10. What is the output of `System.out.println("hello".toUpperCase())`?',
      options: ['hello', 'HELLO', 'Hello', 'Error'],
      correctAnswer: 'HELLO'
    },
    {
      question: '11. What is the default value of an int variable in Java?',
      options: ['0', '1', '-1', 'Error'],
      correctAnswer: '0'
    },
    {
      question: '12. Which keyword is used to define a method that does not return any value in Java?',
      options: ['void', 'null', 'None', 'empty'],
      correctAnswer: 'void'
    },
    {
      question: '13. What is the result of `System.out.println(10 % 3)`?',
      options: ['1', '3', '2', 'Error'],
      correctAnswer: '1'
    },
    {
      question: '14. Which of the following is a valid identifier in Java?',
      options: ['myVar_1', '1stVar', 'first-var', 'my Variable'],
      correctAnswer: 'myVar_1'
    },
    {
      question: '15. What is the output of `System.out.println(5 > 3 && 2 < 4)`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
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

export default ModerateQuizJava;
