import "./Python.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase";
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function BeginnerQuizPython() {
  const questions = [
    {
      question: "1. What is Python?",
      options: [
        "A snake species",
        "A programming language",
        "A type of pasta",
        "A fruit",
      ],
      correctAnswer: "A programming language",
    },
    {
      question: '2. How do you print "Hello, World!" in Python?',
      options: [
        'console.log("Hello, World!")',
        'print("Hello, World!")',
        'echo "Hello, World!"',
        'printf("Hello, World!")',
      ],
      correctAnswer: 'print("Hello, World!")',
    },
    {
      question: "3. What symbol is used for comments in Python?",
      options: ["//", "#", "/* */", "--"],
      correctAnswer: "#",
    },
    {
      question: "4. Which of the following is a Python data type?",
      options: ["number", "int", "boolean", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "5. How do you declare a variable in Python?",
      options: ["var", "let", "const", "None of the above"],
      correctAnswer: "None of the above",
    },
    {
      question: "6. What is the purpose of a `for` loop in Python?",
      options: [
        "Declaring functions",
        "Declaring variables",
        "Iterating over iterable objects",
        "Defining classes",
      ],
      correctAnswer: "Iterating over iterable objects",
    },
    {
      question: "7. What is the output of `print(3 == 3)`?",
      options: ["True", "False", "Error", "None of the above"],
      correctAnswer: "True",
    },
    {
      question:
        "8. Which of the following is NOT a valid Python data structure?",
      options: ["List", "Dictionary", "Tuple", "Array"],
      correctAnswer: "Array",
    },
    {
      question: "9. What does the `None` keyword represent in Python?",
      options: ["Nothing", "Zero", "Empty string", "Undefined"],
      correctAnswer: "Nothing",
    },
    {
      question: '10. What is the output of `print(bool("True"))`?',
      options: ["True", "False", "Error", "None of the above"],
      correctAnswer: "True",
    },
    {
      question:
        "11. What is the correct way to check if a value is in a list in Python?",
      options: [
        "if x in list:",
        "if x = list:",
        "if x == list:",
        "if x has list:",
      ],
      correctAnswer: "if x in list:",
    },
    {
      question: "12. How do you open a file in Python for reading?",
      options: [
        'file.open("filename.txt", "r")',
        'open("filename.txt", "r")',
        'file.read("filename.txt")',
        'read("filename.txt")',
      ],
      correctAnswer: 'open("filename.txt", "r")',
    },
    {
      question:
        "13. Which built-in function is used to get the length of a list in Python?",
      options: ["size()", "count()", "length()", "len()"],
      correctAnswer: "len()",
    },
    {
      question: "14. What is the result of `print(0 == False)`?",
      options: ["True", "False", "Error", "None of the above"],
      correctAnswer: "True",
    },
    {
      question: '15. What is the output of `print("Python"[1:4])`?',
      options: ["Py", "yth", "thon", "P"],
      correctAnswer: "yth",
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
      storeScore("BeginnerQuizPython", score, userId);
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

export default BeginnerQuizPython;
