import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function BeginnerQuizPython() {
  const questions = [
    {
      question: '1. What is the purpose of a lambda function in Python?',
      options: ['To declare a variable', 'To create an anonymous function', 'To define a class', 'To import modules'],
      correctAnswer: 'To create an anonymous function'
    },
    {
      question: '2. What is the output of `print(2 ** 3 ** 2)`?',
      options: ['64', '512', '72', '96'],
      correctAnswer: '512'
    },
    {
      question: '3. Which of the following is a correct way to open a file in Python and automatically close it after use?',
      options: ['file.open("filename.txt", "r")', 'open("filename.txt", "r").close()', 'with open("filename.txt", "r") as file:', 'open("filename.txt", "r")'],
      correctAnswer: 'with open("filename.txt", "r") as file:'
    },
    {
      question: '4. What does the `zip()` function in Python do?',
      options: ['Combines two lists into a dictionary', 'Returns a list of tuples, where each tuple contains the i-th element from each of the argument sequences', 'Unzips a file', 'Finds the longest common substring between two strings'],
      correctAnswer: 'Returns a list of tuples, where each tuple contains the i-th element from each of the argument sequences'
    },
    {
      question: '5. What is the purpose of the `__init__` method in Python classes?',
      options: ['To initialize a variable', 'To define a constructor', 'To create a new instance of a class', 'To delete an object'],
      correctAnswer: 'To define a constructor'
    },
    {
      question: '6. How do you raise a custom exception in Python?',
      options: ['throw CustomException()', 'raise CustomException()', 'exception CustomException()', 'raise_exception CustomException()'],
      correctAnswer: 'raise CustomException()'
    },
    {
      question: '7. What is the output of `print(list(range(0, -5, -1)))`?',
      options: ['[0, -1, -2, -3, -4]', '[-1, -2, -3, -4]', '[0, -1, -2, -3, -4, -5]', '[]'],
      correctAnswer: '[0, -1, -2, -3, -4]'
    },
    {
      question: '8. What is the result of `print(4 // 3)`?',
      options: ['1.33', '1.0', '1', '0.75'],
      correctAnswer: '1'
    },
    {
      question: '9. How do you remove an item from a set in Python?',
      options: ['set.remove()', 'set.delete()', 'set.discard()', 'set.pop()'],
      correctAnswer: 'set.discard()'
    },
    {
      question: '10. What does the `super()` function do in Python?',
      options: ['Calls a method from the superclass', 'Returns the superclass of a class', 'Creates a superclass', 'Calls a method from the subclass'],
      correctAnswer: 'Calls a method from the superclass'
    },
    {
      question: '11. What is the purpose of the `*args` and `**kwargs` in Python function definitions?',
      options: ['To specify required arguments', 'To accept any number of positional and keyword arguments', 'To define default arguments', 'To access class attributes'],
      correctAnswer: 'To accept any number of positional and keyword arguments'
    },
    {
      question: '12. What is the output of `print(isinstance(3, object))`?',
      options: ['True', 'False', 'Error', 'None of the above'],
      correctAnswer: 'True'
    },
    {
      question: '13. What does the `__str__` method do in Python?',
      options: ['Converts an object to a string', 'Converts a string to an object', 'Compares two objects', 'Deletes an object'],
      correctAnswer: 'Converts an object to a string'
    },
    {
      question: '14. What is the purpose of the `@staticmethod` decorator in Python?',
      options: ['To define a static method', 'To define a class method', 'To override a method', 'To inherit a method'],
      correctAnswer: 'To define a static method'
    },
    {
      question: '15. What is the output of `print([i for i in range(5) if i % 2 == 0])`?',
      options: ['[0, 2, 4]', '[1, 3]', '[0, 1, 2, 3, 4]', '[2, 4]'],
      correctAnswer: '[0, 2, 4]'
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
 storeScore("ExpertPythonQuiz", score, userId);
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

export default BeginnerQuizPython;