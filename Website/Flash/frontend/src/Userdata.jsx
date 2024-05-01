import React, { useEffect, useState } from "react";
import { db } from "../src/config/firebase"; // Adjust the import path as necessary
import { collection, onSnapshot } from "firebase/firestore";
import { auth } from "../src/config/firebase"; // Import auth for getting the current user
import './userdata.css';

function Userdata() {
 const [quizScores, setQuizScores] = useState({});
 const [userId, setUserId] = useState(null);

 useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUserId(user.uid);
          console.log("User authenticated, userId:", user.uid);
          listenForQuizScores(user.uid);
        } else {
          console.log("No user is signed in.");
        }
      });

      return () => unsubscribe();
 }, []);

 const listenForQuizScores = (userId) => {
      if (!userId) {
        console.log("User ID is not provided.");
        return;
      }

      const scoresCollectionRef = collection(db, `users/${userId}/scores`);
      const unsubscribe = onSnapshot(scoresCollectionRef, (snapshot) => {
        const newScores = snapshot.docs.reduce((acc, doc) => {
          const quizName = doc.data().quizName;
          const score = doc.data().score;
          // Update the score if it's higher than the current highest score for this quiz
          if (!acc[quizName] || score > acc[quizName]) {
            acc[quizName] = score;
          }
          return acc;
        }, {});
        setQuizScores(newScores);
      });

      // Cleanup function to unsubscribe from the listener
      return () => unsubscribe();
 };

 if (Object.keys(quizScores).length === 0) {
      return <div>Loading...</div>;
 }

 // Determine the lowest score among the latest scores
 const lowestHighestScore = Math.min(...Object.values(quizScores));

 return (
      <div className="userdata-container">
        <h1 className="userdata-title">Quiz Scores</h1>
        <ul className="userdata-list">
          {Object.entries(quizScores).map(([quizName, score], index) => (
            <li key={index} className={`userdata-list-item ${score === lowestHighestScore ? 'userdata-list-item-lowest' : ''}`}>
              {quizName}: {score}
            </li>
          ))}
        </ul>
      </div>
 );
}

export default Userdata;