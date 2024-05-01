import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

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
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        console.log("User authenticated, userId:", user.uid); // Verify userId is set
      } else {
        console.log("No user is signed in.");
      }
    });
  
    return () => unsubscribe();
  }, []);
  
const storeScore = async (quizName, score, userId) => {
 if (!userId) {
    console.error("User is not authenticated.");
    return;
 }

 const timestamp = new Date().toISOString();
 const documentName = `${quizName}_${timestamp}`;
 const scoresCollection = collection(db, `users/${userId}/scores`);
 const scoreDocRef = doc(scoresCollection, documentName);
 console.log("Score to be stored:", score);
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



  const handleAnswerSelect = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);

if (currentQuestionIndex >= questions.length && userId) {
 console.log("User ID:", userId); // Add this line to check the userId value
 storeScore("ModeratePythonQuiz", score, userId);
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