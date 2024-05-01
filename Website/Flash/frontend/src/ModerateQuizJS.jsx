import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function ModerateQuizJS() {
 
  const questions = [
    {
      question: '1. What is the result of `typeof null`?',
      options: ['object', 'null', 'undefined', 'string'],
      correctAnswer: 'object'
    },
    {
      question: '2. What does the `map` method do in JavaScript?',
      options: ['Applies a function to each element of an array and returns a new array with the results', 'Iterates over the elements of an array and returns the first element that satisfies a condition', 'Removes the last element from an array and returns that element', 'Adds new elements to the beginning of an array and returns the new length'],
      correctAnswer: 'Applies a function to each element of an array and returns a new array with the results'
    },
    {
      question: '3. What is the purpose of the `filter` method in JavaScript?',
      options: ['Creates a new array with all elements that pass a test', 'Applies a function to each element of an array and returns a new array with the results', 'Iterates over the elements of an array and returns the first element that satisfies a condition', 'Removes the last element from an array and returns that element'],
      correctAnswer: 'Creates a new array with all elements that pass a test'
    },
    {
      question: '4. What does the `reduce` method do in JavaScript?',
      options: ['Reduces the array to a single value', 'Applies a function to each element of an array and returns a new array with the results', 'Iterates over the elements of an array and returns the first element that satisfies a condition', 'Removes the last element from an array and returns that element'],
      correctAnswer: 'Reduces the array to a single value'
    },
    {
      question: '5. What is the purpose of the `find` method in JavaScript?',
      options: ['Returns the value of the first element in an array that satisfies a provided condition', 'Applies a function to each element of an array and returns a new array with the results', 'Creates a new array with all elements that pass a test', 'Removes the last element from an array and returns that element'],
      correctAnswer: 'Returns the value of the first element in an array that satisfies a provided condition'
    },
    {
      question: '6. What is the difference between `==` and `===` in JavaScript?',
      options: ['`==` performs type coercion, while `===` does not', '`==` compares both value and type, while `===` only compares value', '`==` is used for strict comparison, while `===` is used for loose comparison', '`==` is used for assignment, while `===` is used for comparison'],
      correctAnswer: '`==` performs type coercion, while `===` does not'
    },
    {
      question: '7. What is the purpose of the `Object.keys()` method in JavaScript?',
      options: ['Returns an array of a given object\'s own enumerable property names', 'Returns the value of the first element in an array that satisfies a provided condition', 'Creates a new array with all elements that pass a test', 'Removes the last element from an array and returns that element'],
      correctAnswer: 'Returns an array of a given object\'s own enumerable property names'
    },
    {
      question: '8. What is the difference between `let` and `const` in JavaScript?',
      options: ['`let` allows reassignment, while `const` does not', '`let` is block-scoped, while `const` is function-scoped', '`let` is used for constants, while `const` is used for variables', '`let` creates a new variable, while `const` creates a new constant'],
      correctAnswer: '`let` allows reassignment, while `const` does not'
    },
    {
      question: '9. What is the purpose of the `startsWith()` method in JavaScript?',
      options: ['Checks whether a string starts with a specified substring', 'Returns the index within the calling String object of the first occurrence of the specified value', 'Splits a string object into an array of strings by separating the string into substrings', 'Converts a string to lowercase letters'],
      correctAnswer: 'Checks whether a string starts with a specified substring'
    },
    {
      question: '10. What does the `splice()` method do in JavaScript?',
      options: ['Changes the contents of an array by removing or replacing existing elements and/or adding new elements', 'Applies a function to each element of an array and returns a new array with the results', 'Iterates over the elements of an array and returns the first element that satisfies a condition', 'Removes the last element from an array and returns that element'],
      correctAnswer: 'Changes the contents of an array by removing or replacing existing elements and/or adding new elements'
    },
    {
      question: '11. What is the result of `console.log(3 + 2 + "7")`?',
      options: ['57', '12', '327', 'Error'],
      correctAnswer: '57'
    },
    {
      question: '12. What is the result of `console.log("20" - 5)`?',
      options: ['15', '25', 'Error', 'null'],
      correctAnswer: '15'
    },
    {
      question: '13. What is the purpose of the `Math.random()` method in JavaScript?',
      options: ['Returns a random number between 0 (inclusive) and 1 (exclusive)', 'Returns the square root of a number', 'Returns the value of a base expression to a specified exponent', 'Returns the integer part of a number'],
      correctAnswer: 'Returns a random number between 0 (inclusive) and 1 (exclusive)'
    },
    {
      question: '14. What is the result of `console.log(typeof NaN)`?',
      options: ['number', 'NaN', 'string', 'null'],
      correctAnswer: 'number'
    },
    {
      question: '15. What is the purpose of the `Array.isArray()` method in JavaScript?',
      options: ['Returns true if a variable is an array, false otherwise', 'Returns the index within the calling String object of the first occurrence of the specified value', 'Returns a Boolean value indicating whether the array has no elements', 'Returns the character at the specified index in a string'],
      correctAnswer: 'Returns true if a variable is an array, false otherwise'
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
 storeScore("ModerateQuizJS", score, userId);
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

export default ModerateQuizJS;