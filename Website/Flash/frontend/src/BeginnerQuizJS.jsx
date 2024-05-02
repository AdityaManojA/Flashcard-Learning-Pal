import "./Python.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase";
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function BeginnerQuizJS() {
  const questions = [
    {
      question: 'What does "JS" stand for in JavaScript?',
      options: ["Java Source", "JavaScript", "Java Script", "Joint Source"],
      correctAnswer: "JavaScript",
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["//", "#", "/* */", "--"],
      correctAnswer: "//",
    },
    {
      question: "What is the output of `console.log(typeof [])`?",
      options: ["Array", "object", "undefined", "null"],
      correctAnswer: "object",
    },
    {
      question: 'What will be the result of the following code: `5 + "5"`?',
      options: ["55", "10", "5", "Error"],
      correctAnswer: "55",
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "int", "String", "let"],
      correctAnswer: "var",
    },
    {
      question: "What is the purpose of the `let` keyword in JavaScript?",
      options: [
        "Declaring constants",
        "Declaring functions",
        "Declaring variables",
        "Loop iteration",
      ],
      correctAnswer: "Declaring variables",
    },
    {
      question: 'What is the output of `console.log(3 === "3")`?',
      options: ["true", "false", "Error", "null"],
      correctAnswer: "false",
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["number", "float", "boolean", "string"],
      correctAnswer: "float",
    },
    {
      question: "What does NaN stand for in JavaScript?",
      options: ["Not a Number", "No and No", "New and New", "None and None"],
      correctAnswer: "Not a Number",
    },
    {
      question: 'What is the output of `console.log(Boolean("false"))`?',
      options: ["true", "false", "Error", "null"],
      correctAnswer: "true",
    },
    {
      question:
        "Which function is used to parse a string to an integer in JavaScript?",
      options: [
        "parseInt()",
        "parseFloat()",
        "String.toInt()",
        "Number.parseInt()",
      ],
      correctAnswer: "parseInt()",
    },
    {
      question: "What is the purpose of the `this` keyword in JavaScript?",
      options: [
        "Refers to the current object",
        "Refers to the parent object",
        "Refers to the global object",
        "Refers to the child object",
      ],
      correctAnswer: "Refers to the current object",
    },
    {
      question: "What is the result of `typeof undefined`?",
      options: ["undefined", "object", "null", "string"],
      correctAnswer: "undefined",
    },
    {
      question:
        "Which built-in method removes the last element from an array and returns that element?",
      options: ["pop()", "shift()", "push()", "unshift()"],
      correctAnswer: "pop()",
    },
    {
      question: 'What is the output of `console.log(0 == "0")`?',
      options: ["true", "false", "Error", "null"],
      correctAnswer: "true",
    },
    {
      question: "What is the output of `console.log(10 + 5 * 2);`?",
      options: ["25", "30", "Error", "None of the above"],
      correctAnswer: "25",
    },
    {
      question: "What is the output of `console.log(10 + (5 * 2));`?",
      options: ["25", "30", "Error", "None of the above"],
      correctAnswer: "30",
    },
    {
      question: "What is the output of `console.log(10 + 5 / 2);`?",
      options: ["12.5", "12", "15", "Error"],
      correctAnswer: "12.5",
    },
    {
      question: "What is the output of `console.log(10 + (5 / 2));`?",
      options: ["12.5", "12", "15", "Error"],
      correctAnswer: "12.5",
    },
    {
      question: "What is the output of `console.log(true + false);`?",
      options: ["1", "0", "Error", "None of the above"],
      correctAnswer: "1",
    },
    {
      question: "What is the output of `console.log(false + true);`?",
      options: ["1", "0", "Error", "None of the above"],
      correctAnswer: "1",
    },
    {
      question: "What is the output of `console.log(10 + 5 / 2);`?",
      options: ["12.5", "12", "15", "Error"],
      correctAnswer: "12.5",
    },
    {
      question: "What is the output of `console.log(10 + (5 / 2));`?",
      options: ["12.5", "12", "15", "Error"],
      correctAnswer: "12.5",
    },
    {
      question: "What is the output of `console.log(10 + 5 / 2);`?",
      options: ["12.5", "12", "15", "Error"],
      correctAnswer: "12.5",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Define userAnswers state and its setter
  const [results, setResults] = useState(""); // Define results state and its setter
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 15); // Slice to the first 15 elements
  };

  // Shuffle questions on component mount
  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const handleAnswerSelect = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === shuffledQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: shuffledQuestions[currentQuestionIndex],
        answer: selectedAnswer,
        isCorrect,
      },
    ]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex >= shuffledQuestions.length - 1) {
      // Display results after the last question
      displayResults();
    }
  };

  const displayResults = () => {
    let resultsString = "";
    userAnswers.forEach((answerObj, index) => {
      resultsString += `Question ${index + 1}: ${
        answerObj.question.question
      }\n`;
      resultsString += `Your answer: ${answerObj.answer}\n`;
      if (!answerObj.isCorrect) {
        resultsString += `Correct answer: ${answerObj.question.correctAnswer}\n`;
      }
    });
    resultsString += `Total score: ${score} out of ${shuffledQuestions.length}`;
    setResults(resultsString); // Update the results state with the results string
  };

  return (
    <div className="JavaScript-quiz">
      <div className="quiz-container">
        {currentQuestionIndex < shuffledQuestions.length ? (
          <>
            <div className="question">
              {shuffledQuestions[currentQuestionIndex].question}
            </div>
            <div className="options">
              {shuffledQuestions[currentQuestionIndex].options.map(
                (option, index) => (
                  <button
                    key={index}
                    className="custom-button"
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="end-message">
            <p>Quiz completed!</p>
            <p>
              Your score: {score} out of {shuffledQuestions.length}
            </p>
            <pre>{results}</pre> {/* Display the results string */}
          </div>
        )}
      </div>
    </div>
  );
}

export default BeginnerQuizJS;
