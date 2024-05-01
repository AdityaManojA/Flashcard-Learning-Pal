import React, { useEffect, useState } from "react";
import { db } from "../src/config/firebase"; // Adjust the import path as necessary
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../src/config/firebase"; // Import auth for getting the current user
import './userdata.css';

function Userdata() {
 const [quizScores, setQuizScores] = useState([]);
 const [userId, setUserId] = useState(null);

 useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUserId(user.uid);
          console.log("User authenticated, userId:", user.uid);
          fetchQuizScores(user.uid);
        } else {
          console.log("No user is signed in.");
        }
      });

      return () => unsubscribe();
 }, []);

 const fetchQuizScores = async (userId) => {
      if (!userId) {
        console.log("User ID is not provided.");
        return;
      }

      try {
        const scoresCollectionRef = collection(db, `users/${userId}/scores`);
        const scoresSnapshot = await getDocs(scoresCollectionRef);
        const scoresList = scoresSnapshot.docs.map(doc => ({
          quizName: doc.data().quizName,
          score: doc.data().score,
        }));
        setQuizScores(scoresList);
      } catch (error) {
        console.error("Error fetching quiz scores: ", error);
      }
 };

 if (quizScores.length === 0) {
      return <div className="centered">Loading...</div>;
 }

 // Group scores by quiz name and select the highest score for each quiz
 const groupedScores = quizScores.reduce((acc, score) => {
   if (!acc[score.quizName]) {
     acc[score.quizName] = [];
   }
   acc[score.quizName].push(score.score);
   return acc;
 }, {});

 const highestScores = Object.entries(groupedScores).map(([quizName, scores]) => ({
   quizName,
   score: Math.max(...scores),
 }));

 // Determine the lowest score among the highest scores
 const lowestHighestScore = Math.min(...highestScores.map(score => score.score));

 return (
      <div className="userdata-container">
        <h1 className="userdata-title">Quiz Scores</h1>
        <ul className="userdata-list">
          {highestScores.map((score, index) => (
            <li key={index} className={`userdata-list-item ${score.score === lowestHighestScore ? 'userdata-list-item-lowest' : ''}`}>
              {score.quizName}: {score.score}
            </li>
          ))}
        </ul>
      </div>
 );
}

export default Userdata;