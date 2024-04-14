import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './config/firebase'; // Assuming you have a Firebase configuration file

function UserData({ userId }) {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const quizResultsSnapshot = await getDocs(query(collection(db, 'quizResults'), where('userId', '==', userId)));
        const results = [];
        quizResultsSnapshot.forEach(doc => {
          results.push(doc.data());
        });
        setQuizResults(results);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    if (userId) {
      fetchQuizResults();
    }
  }, [userId]);

  return (
    <div className="user-data">
      <h2>User Quiz Results</h2>
      <ul>
        {quizResults.map((result, index) => (
          <li key={index}>
            <p>Quiz Name: {result.quizName}</p>
            <p>Final Score: {result.finalScore}</p>
            <p>Timestamp: {result.timestamp.toDate().toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserData;
