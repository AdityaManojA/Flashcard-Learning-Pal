import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqO4a0QGttTpBeBIYbPanD34bqe8_jmVk",
  authDomain: "fir-1st-d04b1.firebaseapp.com",
  projectId: "fir-1st-d04b1",
  storageBucket: "fir-1st-d04b1.appspot.com",
  messagingSenderId: "911377317689",
  appId: "1:911377317689:web:ebc177f7a37dcb5b0a32e8",
  measurementId: "G-KFNJZC91SL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);