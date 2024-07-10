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

// apiKey: "AIzaSyBqO4a0QGttTpBeBIYbPanD34bqe8_jmVk",
// authDomain: "fir-1st-d04b1.firebaseapp.com",
// databaseURL: "https://fir-1st-d04b1-default-rtdb.asia-southeast1.firebasedatabase.app",
// projectId: "fir-1st-d04b1",
// storageBucket: "fir-1st-d04b1.appspot.com",
// messagingSenderId: "911377317689",
// appId: "1:911377317689:web:ebc177f7a37dcb5b0a32e8",
// measurementId: "G-KFNJZC91SL"