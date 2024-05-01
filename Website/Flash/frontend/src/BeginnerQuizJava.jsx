import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function BeginnerQuizJava() {
  const questions = [
    {
      question: '1. What is Java?',
      options: ['A programming language', 'A coffee brand', 'A type of car', 'A country'],
      correctAnswer: 'A programming language'
    },
    {
      question: '2. How do you print "Hello, World!" in Java?',
      options: ['System.out.print("Hello, World!");', 'console.log("Hello, World!");', 'print("Hello, World!");', 'echo "Hello, World!";'],
      correctAnswer: 'System.out.print("Hello, World!");'
    },
    {
      question: '3. What symbol is used for comments in Java?',
      options: ['//', '#', '/* */', '--'],
      correctAnswer: '//'
    },
    {
      question: '4. Which of the following is a Java data type?',
      options: ['number', 'int', 'boolean', 'All of the above'],
      correctAnswer: 'All of the above'
    },
    {
      question: '5. How do you declare a variable in Java?',
      options: ['var', 'let', 'const', 'None of the above'],
      correctAnswer: 'None of the above'
    },
    {
      question: '6. What is the purpose of a `for` loop in Java?',
      options: ['Declaring functions', 'Declaring variables', 'Iterating over iterable objects', 'Loop iteration'],
      correctAnswer: 'Loop iteration'
    },
    {
      question: '7. What is the output of `System.out.println(3 == 3);`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'true'
    },
    {
      question: '8. Which of the following is NOT a valid Java data structure?',
      options: ['List', 'Dictionary', 'Tuple', 'Array'],
      correctAnswer: 'Tuple'
    },
    {
      question: '9. What does the `null` keyword represent in Java?',
      options: ['Nothing', 'Zero', 'Empty string', 'Undefined'],
      correctAnswer: 'Nothing'
    },
    {
      question: '10. What is the output of `System.out.println(Boolean.parseBoolean("True"));`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'true'
    },
    {
      question: '11. Which method is used to convert a string to an integer in Java?',
      options: ['parseInt()', 'parseFloat()', 'String.toInt()', 'Number.parseInt()'],
      correctAnswer: 'parseInt()'
    },
    {
      question: '12. What is the purpose of the `this` keyword in Java?',
      options: ['Refers to the current object', 'Refers to the parent object', 'Refers to the global object', 'Refers to the child object'],
      correctAnswer: 'Refers to the current object'
    },
    {
      question: '13. What is the result of `System.out.println(typeof null);`?',
      options: ['null', 'object', 'undefined', 'string'],
      correctAnswer: 'object'
    },
    {
      question: '14. Which built-in method removes the last element from an array and returns that element?',
      options: ['pop()', 'shift()', 'push()', 'unshift()'],
      correctAnswer: 'pop()'
    },
    {
      question: '15. What is the output of `System.out.println(0 == "0");`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'false'
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
 storeScore("BeginnerQuizJava", score, userId);
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

export default BeginnerQuizJava;