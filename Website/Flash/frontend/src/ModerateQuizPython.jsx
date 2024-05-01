import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function ModerateQuizPython() {
  const questions = [
    {
      question: '1. What is the correct way to comment a single line in Python?',
      options: ['#', '//', '/* */', '--'],
      correctAnswer: '#'
    },
    {
      question: '2. How do you declare a variable in Python?',
      options: ['var', 'int', 'String', 'None of the above'],
      correctAnswer: 'None of the above'
    },
    {
      question: '3. What is the output of `print(type([]))`?',
      options: ['List', 'Tuple', 'Dict', 'None of the above'],
      correctAnswer: 'List'
    },
    {
      question: '4. What will be the result of the following code: `5 + "5"` in Python?',
      options: ['55', '10', '5', 'Error'],
      correctAnswer: 'Error'
    },
    {
      question: '5. Which keyword is used to define a function in Python?',
      options: ['def', 'function', 'define', 'func'],
      correctAnswer: 'def'
    },
    {
      question: '6. What is the purpose of the `for` loop in Python?',
      options: ['Declaring constants', 'Declaring functions', 'Iterating over iterable objects', 'Loop iteration'],
      correctAnswer: 'Iterating over iterable objects'
    },
    {
      question: '7. What is the output of `print(3 == "3")`?',
      options: ['True', 'False', 'Error', 'None of the above'],
      correctAnswer: 'False'
    },
    {
      question: '8. Which of the following is NOT a valid Python data type?',
      options: ['float', 'double', 'boolean', 'str'],
      correctAnswer: 'double'
    },
    {
      question: '9. What does the `None` keyword represent in Python?',
      options: ['Nothing', 'Zero', 'Empty string', 'Undefined'],
      correctAnswer: 'Nothing'
    },
    {
      question: '10. What is the output of `print(bool("false"))`?',
      options: ['True', 'False', 'Error', 'None of the above'],
      correctAnswer: 'True'
    },
    {
      question: '11. Which function is used to convert a string to an integer in Python?',
      options: ['int()', 'float()', 'str()', 'None of the above'],
      correctAnswer: 'int()'
    },
    {
      question: '12. What is the purpose of the `self` keyword in Python?',
      options: ['Refers to the current object', 'Refers to the parent object', 'Refers to the global object', 'Refers to the child object'],
      correctAnswer: 'Refers to the current object'
    },
    {
      question: '13. What is the result of `type(None)` in Python?',
      options: ['NoneType', 'object', 'None', 'str'],
      correctAnswer: 'NoneType'
    },
    {
      question: '14. Which built-in method removes the last element from a list and returns it?',
      options: ['pop()', 'remove()', 'append()', 'extend()'],
      correctAnswer: 'pop()'
    },
    {
      question: '15. What is the output of `print(0 == "0")` in Python?',
      options: ['True', 'False', 'Error', 'None of the above'],
      correctAnswer: 'False'
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
    console.log("currentQuestionIndex:", currentQuestionIndex);
    console.log("questions.length:", questions.length);
    console.log("userId:", userId);
if (currentQuestionIndex >= ((questions.length)-1) && userId) {
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