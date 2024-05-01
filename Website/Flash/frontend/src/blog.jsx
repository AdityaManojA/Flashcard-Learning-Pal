import React, { useEffect, useState } from "react";
import './blog.css';
import { auth, db } from "../src/config/firebase"; // Adjust the import path as necessary
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [visibleBlogs, setVisibleBlogs] = useState(4); // New state to track visible blogs

  const navigate = useNavigate()


  // Function to handle "View More" button click
  const handleViewMore = () => {
    setVisibleBlogs(visibleBlogs + 4);
  };



  async function addBlogPost(userId, title, postText) {
    try {
      const userBlogRef = collection(db, `blogs/${userId}/blogs`);
      const blogPostData = {
        title: title,
        postText: postText,
        createdAt: new Date().toISOString(), // Optional: Add a timestamp for when the post was created
        userId: userId // Ensure each blog post has a userId field
      };
      const docRef = await addDoc(userBlogRef, blogPostData);
      console.log("Document written with ID: ", docRef.id);
      // after adding the document clear the states
      setTitle("");
      setPostText("");
      // refresh this current page
      window.location.reload();


    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        console.log(user.email);
        // Call fetchBlogs here to fetch blogs when user logs in
        fetchBlogs();
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });

    

    return () => unsubscribe();
  }, []); 


  async function fetchBlogs() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          
          const userId = user.uid;
          console.log("userId", userId);

          const q = query(collection(db, `blogs/${userId}/blogs`));
          getDocs(q)
            .then(querySnapshot => {
              const blogs = querySnapshot.docs.map(doc => doc.data());
              resolve(blogs);
              setBlogs(blogs);
              console.log(blogs);
            })
            .catch(error => {
              reject(error);
              console.log(error);
            });
        } else {
          // User is signed out
          reject("User is not signed in");
          console.log("User is not signed in");
        }
      });
    });
  }



  console.log(blogs);
  console.log(userId);

  return (
    <div className="createPostPage">
      <div className="cpConatiner">

        <h1>Blog Posts</h1>
        <div className="inputGp">
          <label>Enter the Title</label>
          <input placeholder="Title..." onChange={(event) => {
            setTitle(event.target.value);
          }} />
        </div>
        <div className="inputGp">
          <div className="inputGp1">
            <label>CHAT</label>
            <textarea placeholder="Enter your questions here..."
              onChange={(event) => {
                setPostText(event.target.value);
              }} />
          </div>
        </div>
        <button onClick={() => addBlogPost(user.uid, title, postText)}>Submit Chat</button>

      </div>
      {/* Display fetched blogs */}
      <h2>blogs</h2>
      <div className="blogsContainer">
        {blogs.length === 0 ? <p>No blogs found</p>
          :
          blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort blogs by createdAt in descending order
            .slice(0, visibleBlogs)
            .map((blog, index) => (
              <div key={index} className="blogPost" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <h3>{blog.title}</h3>
                <p>{blog.postText}</p>
                <p>{blog.createdAt}</p>
              </div>
            ))}
        {visibleBlogs < blogs.length && <button onClick={handleViewMore}>View More</button>}
      </div>
    </div>
  );
}

