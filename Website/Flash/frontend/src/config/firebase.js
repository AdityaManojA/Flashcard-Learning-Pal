import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfFcsiaboaeDj1m1lyw2uHflMLfsU8a3Y",
  authDomain: "flashcardpal.firebaseapp.com",
  projectId: "flashcardpal",
  storageBucket: "flashcardpal.appspot.com",
  messagingSenderId: "554014823507",
  appId: "1:554014823507:web:cf0da82ef1c2a6e71b62a6",
  measurementId: "G-RLT0P6K49P",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
