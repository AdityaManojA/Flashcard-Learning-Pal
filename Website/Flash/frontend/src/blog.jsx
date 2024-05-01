import React, {useState} from "react";
import './blog.css';
import {addDoc,collection} from 'firebase/firestore';
import{ db, auth } from "/src/config/firebase.js";
import { useNavigate } from "react-router-dom";

export default function blog() {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState(""); 
  const postsCollectionRef = collection(db, "posts")
  let navigate = useNavigate();
  const createPost = async() => {
      await addDoc(postsCollectionRef, {title, postText, author: {name:auth.currentUser.displayName , id: auth.currentUser.uid},
      });
     };
     navigate("/");
     return  (
<div className="createPostPage">
  <div className="cpConatiner">
    <h1> Blog Posts </h1>
    <div className="inputGp">
      <label> Enter the Title</label>
      <input placeholder="Title..." onChange={(event)=> {
        setTitle(event.target.value);
      }}/>
    </div>
      <div className="inputGp">
        <div className="inputGp1">
        
          <label> CHAT</label>
        
        <textarea placeholder="Enter your questions here..."
        onChange={(event)=> {
          setPostText(event.target.value);
        }} />
      </div>
      </div>
      
      <button   onClick={createPost}> Submit Chat</button>
    </div>
  </div>

  )
}
