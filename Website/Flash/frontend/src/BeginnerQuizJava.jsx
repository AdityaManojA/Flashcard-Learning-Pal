import './Python.css'; 
import React, { useState, useEffect } from "react";

function BeginnerQuizJava() {
  const questions = [
   {
      question: 'What is Java?',
      options: ['A programming language', 'A coffee brand', 'A type of car', 'A country'],
      correctAnswer: 'A programming language'
   },
   {
      question: 'How do you print "Hello, World!" in Java?',
      options: ['System.out.print("Hello, World!");', 'console.log("Hello, World!");', 'print("Hello, World!");', 'echo "Hello, World!";'],
      correctAnswer: 'System.out.print("Hello, World!");'
   },
   {
      question: 'What symbol is used for comments in Java?',
      options: ['//', '#', '/* */', '--'],
      correctAnswer: '//'
   },
   {
      question: 'Which of the following is a Java data type?',
      options: ['number', 'int', 'boolean', 'All of the above'],
      correctAnswer: 'All of the above'
   },
   {
      question: 'How do you declare a variable in Java?',
      options: ['var', 'let', 'const', 'None of the above'],
      correctAnswer: 'None of the above'
   },
   {
      question: 'What is the purpose of a `for` loop in Java?',
      options: ['Declaring functions', 'Declaring variables', 'Iterating over iterable objects', 'Loop iteration'],
      correctAnswer: 'Loop iteration'
   },
   {
      question: 'What is the output of `System.out.println(3 == 3);`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'true'
   },
   {
      question: 'Which of the following is NOT a valid Java data structure?',
      options: ['List', 'Dictionary', 'Tuple', 'Array'],
      correctAnswer: 'Tuple'
   },
   {
      question: 'What does the `null` keyword represent in Java?',
      options: ['Nothing', 'Zero', 'Empty string', 'Undefined'],
      correctAnswer: 'Nothing'
   },
   {
      question: 'What is the output of `System.out.println(Boolean.parseBoolean("True"));`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'true'
   },
   {
      question: 'Which method is used to convert a string to an integer in Java?',
      options: ['parseInt()', 'parseFloat()', 'String.toInt()', 'Number.parseInt()'],
      correctAnswer: 'parseInt()'
   },
   {
      question: 'What is the purpose of the `this` keyword in Java?',
      options: ['Refers to the current object', 'Refers to the parent object', 'Refers to the global object', 'Refers to the child object'],
      correctAnswer: 'Refers to the current object'
   },
   {
      question: 'What is the result of `System.out.println(typeof null);`?',
      options: ['null', 'object', 'undefined', 'string'],
      correctAnswer: 'object'
   },
   {
      question: 'Which built-in method removes the last element from an array and returns that element?',
      options: ['pop()', 'shift()', 'push()', 'unshift()'],
      correctAnswer: 'pop()'
   },
   {
      question: 'What is the output of `System.out.println(0 == "0");`?',
      options: ['true', 'false', 'Error', 'None of the above'],
      correctAnswer: 'false'
   },
   // Add more questions here
   {
      question: 'What is the default value of a boolean in Java?',
      options: ['true', 'false', 'null', 'undefined'],
      correctAnswer: 'false'
   },
   {
      question: 'What is the purpose of the `final` keyword in Java?',
      options: ['To declare a variable that cannot be changed', 'To declare a method that cannot be overridden', 'To declare a class that cannot be extended', 'None of the above'],
      correctAnswer: 'To declare a variable that cannot be changed'
   },
   {
      question: 'What is the difference between `==` and `equals()` in Java?',
      options: ['== checks for reference, equals() checks for value', '== and equals() do the same thing', '== checks for value, equals() checks for reference', 'None of the above'],
      correctAnswer: '== checks for reference, equals() checks for value'
   },
   {
      question: 'What is the output of `System.out.println("10" + 5);`?',
      options: ['105', '15', 'Error', 'None of the above'],
      correctAnswer: '105'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 + "10");`?',
      options: ['2010', '105', 'Error', 'None of the above'],
      correctAnswer: '2010'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5);`?',
      options: ['105', '15', 'Error', 'None of the above'],
      correctAnswer: '15'
   },
   {
      question: 'What is the output of `System.out.println(10 + "5");`?',
      options: ['105', '15', 'Error', 'None of the above'],
      correctAnswer: '105'
   },
   {
      question: 'What is the output of `System.out.println("10" + 5 + 10);`?',
      options: ['10510', '25', 'Error', 'None of the above'],
      correctAnswer: '10510'
   },
   {
      question: 'What is the output of `System.out.println(true + false);`?',
      options: ['1', '0', 'Error', 'None of the above'],
      correctAnswer: '1'
   },
   {
      question: 'What is the output of `System.out.println(false + true);`?',
      options: ['1', '0', 'Error', 'None of the above'],
      correctAnswer: '1'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 * 2);`?',
      options: ['25', '30', 'Error', 'None of the above'],
      correctAnswer: '25'
   },
   {
      question: 'What is the output of `System.out.println(10 + (5 * 2));`?',
      options: ['25', '30', 'Error', 'None of the above'],
      correctAnswer: '30'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + (5 / 2));`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + (5 / 2));`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
   {
      question: 'What is the output of `System.out.println(10 + 5 / 2);`?',
      options: ['12.5', '12', '15', 'Error'],
      correctAnswer: '12.5'
   },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Define userAnswers state and its setter
  const [results, setResults] = useState(''); // Define results state and its setter
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
     const isCorrect = selectedAnswer === shuffledQuestions[currentQuestionIndex].correctAnswer;
     if (isCorrect) {
       setScore(prevScore => prevScore + 1);
     }
     setUserAnswers(prevAnswers => [...prevAnswers, { question: shuffledQuestions[currentQuestionIndex], answer: selectedAnswer, isCorrect }]);
     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
 
     if (currentQuestionIndex >= shuffledQuestions.length - 1) {
       // Display results after the last question
       displayResults();
     }
  };
 
  const displayResults = () => {
     let resultsString = '';
     userAnswers.forEach((answerObj, index) => {
       resultsString += `Question ${index + 1}: ${answerObj.question.question}\n`;
       resultsString += `Your answer: ${answerObj.answer}\n`;
       if (!answerObj.isCorrect) {
         resultsString += `Correct answer: ${answerObj.question.correctAnswer}\n`;
       }
     });
     resultsString += `Total score: ${score} out of ${shuffledQuestions.length}`;
     setResults(resultsString); // Update the results state with the results string
  };
 
  return (
     <div className='JavaScript-quiz'>
       <div className='quiz-container'>
         {currentQuestionIndex < shuffledQuestions.length ? (
           <>
             <div className='question'>{shuffledQuestions[currentQuestionIndex].question}</div>
             <div className='options'>
               {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
                 <button key={index} className='custom-button' onClick={() => handleAnswerSelect(option)}>{option}</button>
               ))}
             </div>
           </>
         ) : (
           <div className='end-message'>
             <p>Quiz completed!</p>
             <p>Your score: {score} out of {shuffledQuestions.length}</p>
             <pre>{results}</pre> {/* Display the results string */}
           </div>
         )}
       </div>
     </div>
  );
 }
 
 export default BeginnerQuizJava;
