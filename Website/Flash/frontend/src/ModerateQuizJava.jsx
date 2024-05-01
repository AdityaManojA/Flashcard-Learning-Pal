import './Python.css'; 
import React, { useEffect, useState } from "react";
import { auth, db } from "../src/config/firebase"; 
import { setDoc, collection, doc } from "firebase/firestore"; // Import collection and doc here
import { set } from "firebase/database";

function ModerateQuizJava() {
 
const questions = [
    {
      question: '1. What is method overloading in Java?',
      options: ['It allows a subclass to provide a specific implementation of a method that is already provided by its superclass', 'It allows a class to have multiple methods with the same name but different parameters', 'It allows a class to inherit properties and behavior from another class', 'It allows a method to have multiple return types'],
      correctAnswer: 'It allows a class to have multiple methods with the same name but different parameters'
    },
    {
      question: '2. What is method overriding in Java?',
      options: ['It allows a subclass to provide a specific implementation of a method that is already provided by its superclass', 'It allows a class to have multiple methods with the same name but different parameters', 'It allows a class to inherit properties and behavior from another class', 'It allows a method to have multiple return types'],
      correctAnswer: 'It allows a subclass to provide a specific implementation of a method that is already provided by its superclass'
    },
    {
      question: '3. What is the purpose of the `super` keyword in Java?',
      options: ['To refer to the superclass of the current class', 'To call a method from the superclass', 'To create an instance of a subclass', 'To initialize an object'],
      correctAnswer: 'To refer to the superclass of the current class'
    },
    {
      question: '4. What is the difference between `==` and `.equals()` in Java?',
      options: ['`==` compares object references, while `.equals()` compares object contents', '`==` compares primitive data types, while `.equals()` compares objects', '`==` is used for assignment, while `.equals()` is used for comparison', '`==` is used for comparison, while `.equals()` is used for assignment'],
      correctAnswer: '`==` compares object references, while `.equals()` compares object contents'
    },
    {
      question: '5. What is the purpose of the `try`, `catch`, and `finally` blocks in Java exception handling?',
      options: ['To handle errors and exceptions', 'To create custom exceptions', 'To terminate the program', 'To ignore exceptions'],
      correctAnswer: 'To handle errors and exceptions'
    },
    {
      question: '6. What is the difference between checked and unchecked exceptions in Java?',
      options: ['Checked exceptions must be declared in the method signature or caught using a try-catch block, while unchecked exceptions do not have this requirement', 'Unchecked exceptions must be declared in the method signature or caught using a try-catch block, while checked exceptions do not have this requirement', 'Checked exceptions occur at compile-time, while unchecked exceptions occur at runtime', 'Unchecked exceptions occur at compile-time, while checked exceptions occur at runtime'],
      correctAnswer: 'Checked exceptions must be declared in the method signature or caught using a try-catch block, while unchecked exceptions do not have this requirement'
    },
    {
      question: '7. What is the purpose of the `this` keyword in Java constructors?',
      options: ['To refer to the current class instance', 'To refer to the parent class instance', 'To refer to the subclass instance', 'To refer to the superclass instance'],
      correctAnswer: 'To refer to the current class instance'
    },
    {
      question: '8. What is the purpose of the `instanceof` operator in Java?',
      options: ['To check if an object belongs to a specific class or interface', 'To create a new instance of a class', 'To check if two objects are equal', 'To convert a primitive data type into an object'],
      correctAnswer: 'To check if an object belongs to a specific class or interface'
    },
    {
      question: '9. What is the difference between an abstract class and an interface in Java?',
      options: ['An abstract class can have concrete methods, while an interface cannot', 'An interface can have fields, while an abstract class cannot', 'An abstract class can implement multiple interfaces, while an interface cannot extend a class', 'An interface can have constructors, while an abstract class cannot'],
      correctAnswer: 'An abstract class can have concrete methods, while an interface cannot'
    },
    {
      question: '10. What is a lambda expression in Java?',
      options: ['A way to define anonymous functions', 'A way to declare variables', 'A way to define classes', 'A way to handle exceptions'],
      correctAnswer: 'A way to define anonymous functions'
    },
    {
      question: '11. What is the purpose of the `default` keyword in Java interfaces?',
      options: ['To define a default implementation for a method in an interface', 'To specify the default package for a class', 'To declare a default constructor for a class', 'To specify default values for instance variables'],
      correctAnswer: 'To define a default implementation for a method in an interface'
    },
    {
      question: '12. What is the purpose of the `package` statement in Java?',
      options: ['To declare a package for a class', 'To import classes from other packages', 'To specify the default package for a class', 'To specify default values for instance variables'],
      correctAnswer: 'To declare a package for a class'
    },
    {
      question: '13. What is the purpose of the `enum` keyword in Java?',
      options: ['To declare an enumeration', 'To declare a variable', 'To declare a method', 'To declare a class'],
      correctAnswer: 'To declare an enumeration'
    },
    {
      question: '14. What is the purpose of the `finally` block in Java exception handling?',
      options: ['To execute code regardless of whether an exception occurs or not', 'To catch exceptions', 'To throw exceptions', 'To ignore exceptions'],
      correctAnswer: 'To execute code regardless of whether an exception occurs or not'
    },
    {
      question: '15. What is the purpose of the `synchronized` keyword in Java?',
      options: ['To ensure that only one thread can access a block of code at a time', 'To create a new thread', 'To synchronize the clocks of multiple threads', 'To prevent inheritance'],
      correctAnswer: 'To ensure that only one thread can access a block of code at a time'
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
 storeScore("ModerateQuizJava", score, userId);
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

export default ModerateQuizJava;