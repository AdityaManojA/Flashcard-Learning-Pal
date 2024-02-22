import React, { useState } from 'react';
import './Python.css'; 

function BeginnerQuizJava() {
  const questions = [
    {
      question: '1. What does "JVM" stand for in Java?',
      options: ['Java Virtual Machine', 'Java Virtual Memory', 'Java Virtual Method', 'Java Virtual Module'],
      correctAnswer: 'Java Virtual Machine'
    },
    {
      question: '2. Which keyword is used to declare a constant in Java?',
      options: ['var', 'let', 'final', 'const'],
      correctAnswer: 'final'
    },
    {
      question: '3. What is the output of `System.out.println(5 == 5)`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
    },
    {
      question: '4. Which operator is used to allocate memory in Java?',
      options: ['new', 'malloc', 'alloc', 'newmalloc'],
      correctAnswer: 'new'
    },
    {
      question: '5. What is the correct syntax for a single-line comment in Java?',
      options: ['//', '#', '/* */', '--'],
      correctAnswer: '//'
    },
    {
      question: '6. What is the result of `System.out.println(3 + "3")`?',
      options: ['33', '6', '3', 'Error'],
      correctAnswer: '33'
    },
    {
      question: '7. Which of the following data types is used to store a single character in Java?',
      options: ['char', 'String', 'int', 'float'],
      correctAnswer: 'char'
    },
    {
      question: '8. What is the purpose of the `break` statement in Java?',
      options: ['Terminate a loop', 'Skip the current iteration of a loop', 'Jump to a specific label', 'Exit the entire program'],
      correctAnswer: 'Terminate a loop'
    },
    {
      question: '9. Which of the following is NOT a Java keyword?',
      options: ['class', 'interface', 'extends', 'function'],
      correctAnswer: 'function'
    },
    {
      question: '10. What is the output of `System.out.println(true && false)`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '11. What is the output of `System.out.println("Java".length())`?',
      options: ['Error', '4', '0', 'null'],
      correctAnswer: '4'
    },
    {
      question: '12. What is the default value of a boolean variable in Java?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '13. Which of the following is a reserved keyword in Java but not used?',
      options: ['goto', 'enum', 'throws', 'assert'],
      correctAnswer: 'goto'
    },
    {
      question: '14. What is the output of `System.out.println(10 / 3)`?',
      options: ['3', '3.33', '3.0', 'Error'],
      correctAnswer: '3'
    },
    {
      question: '15. Which of the following is NOT a Java operator?',
      options: ['|', '>>', '<<<', '!'],
      correctAnswer: '<<<'
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

export default BeginnerQuizJava;
