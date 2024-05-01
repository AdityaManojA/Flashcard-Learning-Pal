import { db } from './config/firebase';
import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; // Adjust the import path as necessary
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { set } from "firebase/database";
import { useNavigate } from "react-router-dom";

function ModerateQuizPython() {
  const questions = [
    {
      question: '1. What does "JS" stand for in JavaScript?',
      options: ['Java Source', 'JavaScript', 'Java Script', 'Joint Source'],
      correctAnswer: 'JavaScript'
    },
    {
      question: '2. Which symbol is used for single-line comments in JavaScript?',
      options: ['//', '#', '/* */', '--'],
      correctAnswer: '//'
    },
    {
      question: '3. What is the output of `console.log(typeof [])`?',
      options: ['Array', 'object', 'undefined', 'null'],
      correctAnswer: 'object'
    },
    {
      question: '4. What will be the result of the following code: `5 + "5"`?',
      options: ['55', '10', '5', 'Error'],
      correctAnswer: '55'
    },
    {
      question: '5. Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'int', 'String', 'let'],
      correctAnswer: 'var'
    },
    {
      question: '6. What is the purpose of the `let` keyword in JavaScript?',
      options: ['Declaring constants', 'Declaring functions', 'Declaring variables', 'Loop iteration'],
      correctAnswer: 'Declaring variables'
    },
    {
      question: '7. What is the output of `console.log(3 === "3")`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'false'
    },
    {
      question: '8. Which of the following is NOT a JavaScript data type?',
      options: ['number', 'float', 'boolean', 'string'],
      correctAnswer: 'float'
    },
    {
      question: '9. What does NaN stand for in JavaScript?',
      options: ['Not a Number', 'No and No', 'New and New', 'None and None'],
      correctAnswer: 'Not a Number'
    },
    {
      question: '10. What is the output of `console.log(Boolean("false"))`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
    },
    {
      question: '11. Which function is used to parse a string to an integer in JavaScript?',
      options: ['parseInt()', 'parseFloat()', 'String.toInt()', 'Number.parseInt()'],
      correctAnswer: 'parseInt()'
    },
    {
      question: '12. What is the purpose of the `this` keyword in JavaScript?',
      options: ['Refers to the current object', 'Refers to the parent object', 'Refers to the global object', 'Refers to the child object'],
      correctAnswer: 'Refers to the current object'
    },
    {
      question: '13. What is the result of `typeof undefined`?',
      options: ['undefined', 'object', 'null', 'string'],
      correctAnswer: 'undefined'
    },
    {
      question: '14. Which built-in method removes the last element from an array and returns that element?',
      options: ['pop()', 'shift()', 'push()', 'unshift()'],
      correctAnswer: 'pop()'
    },
    {
      question: '15. What is the output of `console.log(0 == "0")`?',
      options: ['true', 'false', 'Error', 'null'],
      correctAnswer: 'true'
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const storeScore = async (quizName, score) => {
    console.log("Attempting to store score...");
    const userId = auth.currentUser.uid;
    console.log("User ID:", userId);

    if (!userId) {
      console.error("User is not authenticated.");
      return;
   }
  
   const timestamp = new Date().toISOString();
   const documentName = `${quizName}_${timestamp}`;
   const scoresCollection = collection(db, `users/${userId}/scores`);
   const scoreDocRef = doc(scoresCollection, documentName);
  
   try {
      await setDoc(scoreDocRef, {
        quizName: quizName,
        score: score,
        timestamp: timestamp,
      });
      console.log("Score saved successfully.");
   } catch (error) {
      console.error("Error saving score:", error);
   }
  };

  // Example of manually triggering the function

 const handleAnswerSelect = (selectedAnswer) => {
  const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
  if (isCorrect) {
     setScore(prevScore => prevScore + 1);
  }
  setCurrentQuestionIndex(prevIndex => prevIndex + 1);
 
  // Check if the quiz is completed
  if (currentQuestionIndex >= questions.length) {
     // Automatically store the score when the quiz is completed
     storeScore("ModeratePythonQuiz", score); // Adjust the quiz name as necessary
  }
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
export default ModerateQuizPython;
