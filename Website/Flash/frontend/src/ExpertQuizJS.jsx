import "./Python.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase";
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function ExpertQuizJS() {
  const questions = [
    {
      question: "1. What is a closure in JavaScript?",
      options: [
        "A function that has access to its own scope",
        "A function that has access to the scope in which it was created, even after that scope has closed",
        "A function that takes another function as an argument",
        "A function that returns a new function",
      ],
      correctAnswer:
        "A function that has access to the scope in which it was created, even after that scope has closed",
    },
    {
      question: "2. What is prototypal inheritance in JavaScript?",
      options: [
        "A way of creating objects based on a blueprint",
        "A way of sharing methods and properties between objects",
        "A way of accessing the prototype of an object",
        "A way of extending built-in objects",
      ],
      correctAnswer: "A way of sharing methods and properties between objects",
    },
    {
      question: "3. What is the Event Loop in JavaScript?",
      options: [
        "A loop that handles asynchronous callbacks",
        "A loop that handles events in the DOM",
        "A loop that handles recursive functions",
        "A loop that handles AJAX requests",
      ],
      correctAnswer: "A loop that handles asynchronous callbacks",
    },
    {
      question:
        "4. What is the difference between `==` and `===` in JavaScript?",
      options: [
        "`==` compares values only, while `===` compares both values and types",
        "`==` is used for assignment, while `===` is used for comparison",
        "`==` compares objects, while `===` compares primitives",
        "`==` is used for strict comparison, while `===` is used for loose comparison",
      ],
      correctAnswer:
        "`==` compares values only, while `===` compares both values and types",
    },
    {
      question: "5. What is the purpose of the `bind` method in JavaScript?",
      options: [
        "To bind a function to an event",
        "To bind a function to a specific context, so it can be called with that context",
        "To bind a function to a specific argument",
        "To bind a function to a specific variable",
      ],
      correctAnswer:
        "To bind a function to a specific context, so it can be called with that context",
    },
    {
      question:
        "6. What is the difference between `null` and `undefined` in JavaScript?",
      options: [
        "`null` is an object, while `undefined` is a primitive",
        "`null` represents the intentional absence of any object value, while `undefined` represents a variable that has been declared but not assigned a value",
        "`null` represents a variable that has been declared but not assigned a value, while `undefined` represents the intentional absence of any object value",
        "`null` and `undefined` are the same",
      ],
      correctAnswer:
        "`null` represents the intentional absence of any object value, while `undefined` represents a variable that has been declared but not assigned a value",
    },
    {
      question: "7. What is the purpose of the `forEach` method in JavaScript?",
      options: [
        "To iterate over the elements of an array",
        "To create a new array with the results of calling a provided function on every element in the calling array",
        "To check if all elements in an array pass a test",
        "To remove the last element from an array and return that element",
      ],
      correctAnswer: "To iterate over the elements of an array",
    },
    {
      question: "8. What is a higher-order function in JavaScript?",
      options: [
        "A function that returns another function",
        "A function that takes another function as an argument, or returns a function, or both",
        "A function that can be called without any arguments",
        "A function that can only be called with a specific context",
      ],
      correctAnswer:
        "A function that takes another function as an argument, or returns a function, or both",
    },
    {
      question: "9. What is a pure function in JavaScript?",
      options: [
        "A function that does not have any side effects",
        "A function that returns a new function",
        "A function that modifies the state of its arguments",
        "A function that takes another function as an argument",
      ],
      correctAnswer: "A function that does not have any side effects",
    },
    {
      question:
        "10. What is the difference between `let`, `const`, and `var` in JavaScript?",
      options: [
        "`let` and `const` have block scope, while `var` has function scope",
        "`let` and `const` are hoisted to the top of their block, while `var` is hoisted to the top of its function",
        "`let` and `const` cannot be reassigned, while `var` can",
        "There is no difference between `let`, `const`, and `var`",
      ],
      correctAnswer:
        "`let` and `const` have block scope, while `var` has function scope",
    },
    {
      question: "11. What is the purpose of the `reduce` method in JavaScript?",
      options: [
        "To iterate over the elements of an array",
        "To create a new array with the results of calling a provided function on every element in the calling array",
        "To check if all elements in an array pass a test",
        "To reduce the array to a single value",
      ],
      correctAnswer: "To reduce the array to a single value",
    },
    {
      question: "12. What is a generator function in JavaScript?",
      options: [
        "A function that returns a new function",
        "A function that takes another function as an argument",
        "A function that can yield multiple values",
        "A function that can only be called with a specific context",
      ],
      correctAnswer: "A function that can yield multiple values",
    },
    {
      question:
        "13. What is the purpose of the `Promise` object in JavaScript?",
      options: [
        "To represent a value that may be available now, or in the future, or never",
        "To handle asynchronous operations",
        "To create a new array with the results of calling a provided function on every element in the calling array",
        "To reduce the array to a single value",
      ],
      correctAnswer:
        "To represent a value that may be available now, or in the future, or never",
    },
    {
      question:
        "14. What is the purpose of the `async` and `await` keywords in JavaScript?",
      options: [
        "To define a function that returns a promise",
        "To handle asynchronous operations",
        "To create a new array with the results of calling a provided function on every element in the calling array",
        "To reduce the array to a single value",
      ],
      correctAnswer: "To handle asynchronous operations",
    },
    {
      question: "15. What is a rest parameter in JavaScript?",
      options: [
        "A parameter that represents an unknown number of arguments as an array",
        "A parameter that represents an unknown number of arguments as individual values",
        "A parameter that has a default value",
        "A parameter that has to be provided by the caller",
      ],
      correctAnswer:
        "A parameter that represents an unknown number of arguments as an array",
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    console.log("currentQuestionIndex:", currentQuestionIndex);
    console.log("questions.length:", questions.length);
    console.log("userId:", userId);
    if (currentQuestionIndex >= questions.length - 1 && userId) {
      console.log("User ID:", userId); // Add this line to check the userId value
      storeScore("ExpertQuizJS", score, userId);
    }
  };

  return (
    <div className="JavaScript-quiz">
      <div className="quiz-container">
        {currentQuestionIndex < questions.length ? (
          <>
            <div className="question">
              {questions[currentQuestionIndex].question}
            </div>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="custom-button"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="end-message">
            Quiz completed! Your score: {score} out of {questions.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpertQuizJS;
