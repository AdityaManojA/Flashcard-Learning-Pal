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
    return <div>Loading...</div>;
 }

 return (
    <div>
      <h1>Quiz Scores</h1>
      <ul>
        {quizScores.map((score, index) => (
          <li key={index}>{score.quizName}: {score.score}</li>
        ))}
      </ul>
    </div>
 );
}

export default Userdata;