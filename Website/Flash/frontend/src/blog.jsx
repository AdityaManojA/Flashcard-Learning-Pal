import React, { useEffect, useState } from "react";
import './blog.css';
import { auth, db } from "../src/config/firebase"; // Adjust the import path as necessary
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export default function Blog() {
 const [title, setTitle] = useState("");
 const [postText, setPostText] = useState("");
 const [user, setUser] = useState(null);
 const [email, setEmail] = useState("");
 const [blog, setBlog] = useState([]); // State to store fetched blogs
 const [visibleBlogs, setVisibleBlogs] = useState(2); // New state to track visible blogs
 const [showModal, setShowModal] = useState(false);
 const [commentText, setCommentText] = useState("");
 const [currentBlogId, setCurrentBlogId] = useState(null); // To keep track of which blog the comment is for
 const [replyTargetId, setReplyTargetId] = useState(null); // New state to track the reply target comment ID

 const navigate = useNavigate();

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setEmail(user.email);
        fetchBlogs();
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
 }, [blog]);

 const handleViewMore = () => {
    setVisibleBlogs(visibleBlogs + 4);
 };

 const addBlogPost = async (userId, title, postText) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const blogsRef = collection(db, `blogs`);
      const blogPostData = {
        title: title,
        postText: postText,
        createdAt: new Date().toISOString(),
        userId: userId,
        userEmail: email
      };
      const docRef = await addDoc(blogsRef, blogPostData);
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setPostText("");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
 };

 const fetchBlogs = async () => {
    const blogsRef = collection(db, "blogs");
    const querySnapshot = await getDocs(blogsRef);
    const allBlogs = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const blogData = doc.data();
      const commentsRef = collection(db, `blogs/${doc.id}/comments`);
      const commentsSnapshot = await getDocs(commentsRef);
      const comments = await Promise.all(commentsSnapshot.docs.map(async (commentDoc) => {
        const commentData = commentDoc.data();
        const repliesRef = collection(db, `blogs/${doc.id}/comments/${commentDoc.id}/replies`);
        const repliesSnapshot = await getDocs(repliesRef);
        const replies = await Promise.all(repliesSnapshot.docs.map(async (replyDoc) => {
          const replyData = replyDoc.data();
          return {
            ...replyData,
            id: replyDoc.id, // Include the document ID in the reply object
          };
        }));
        return {
          ...commentData,
          id: commentDoc.id, // Include the document ID in the comment object
          replies, // Add the replies array to the comment
        };
      }));
      return { id: doc.id, ...blogData, comments };
    }));
    setBlog(allBlogs);
 };

 const handleCommentSubmit = async () => {
    if (!user || !currentBlogId) {
      console.error("User not authenticated or currentBlogId is null");
      return;
    }

    try {
      let commentsRef;
      if (replyTargetId) {
        // Replying to a specific comment
        commentsRef = collection(db, `blogs/${currentBlogId}/comments/${replyTargetId}/replies`);
      } else {
        // Adding a new comment to the blog
        commentsRef = collection(db, `blogs/${currentBlogId}/comments`);
      }

      const docRef = await addDoc(commentsRef, {
        text: commentText,
        userId: user.uid,
        userEmail: email,
        createdAt: new Date().toISOString(),
      });

      console.log("Comment/reply submitted successfully. New ID:", docRef.id);
      setCommentText("");
      setShowModal(false);
      setReplyTargetId(null); // Reset the reply target ID after submitting
    } catch (e) {
      console.error("Error adding comment/reply:", e);
    }
 };

 const renderReplies = (replies) => {
    return replies.map((reply, replyIndex) => (
      <div key={replyIndex} style={{ marginLeft: '100px' }}>
        <p>{reply.text} - {reply.userEmail}</p>
        
        {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
      </div>
    ));
 };

 return (
    <div className="createPostPage">
      {/* Existing code for creating a blog post */}
      <div className="createPostContainer">
        <h1>Create a Blog Post</h1>
        <div className="inputGp">
          <label>Enter the Title</label>
          <input placeholder="Title..." onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="inputGp">
          <div className="inputGp1">
            <label>CHAT</label>
            <textarea placeholder="Enter your questions here..."
              onChange={(event) => setPostText(event.target.value)} />
          </div>
        </div>
        <button onClick={() => addBlogPost(user?.uid, title, postText)}>Submit Chat</button>
      </div>
      <div className="fetchedBlogsContainer">
        
        {blog.length === 0 ? <p>No blogs found</p>
          :
          blog.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort blogs by createdAt in descending order
            .slice(0, visibleBlogs)
            .map((blog, index) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} key={index}>
                <h2 style={{color:'black'}}>{blog.userEmail}</h2>
                <div key={index} className="blogPost" style={{ display: 'flex', flexDirection: 'row', gap: '20px', border: '1px solid #fff', borderRadius: '10px', padding: '10px' }}>
                 <h3 style={{color:'black'}}>{blog.title}</h3>
                 <p>{blog.postText}</p>
                 <p>{new Date(blog.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
                <div>
                 {blog.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} style={{margin:'10px'}}>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p>{comment.text} - {comment.userEmail}</p>
                        <div onClick={() => {
                          setShowModal(true);
                          setReplyTargetId(comment.id); // This sets the ID of the comment you're replying to
                          setCurrentBlogId(blog.id); // This sets the ID of the blog the comment belongs to
                        }}>Reply</div>
                      </div>
                      {/* Render replies for each comment */}
                      {renderReplies(comment.replies)}
                    </div>
                  ))}
                </div>
                <button onClick={() => { console.log("Setting currentBlogId to:", blog.id); setShowModal(true); setCurrentBlogId(blog.id); }}>Reply</button>
              </div>
            ))}
        {visibleBlogs < blog.length && <button onClick={handleViewMore}>View More</button>}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ color: 'black' }}>Leave a Comment</h2>
            <textarea
              placeholder="Your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ width: '100%', height: '100px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <button onClick={handleCommentSubmit}>Reply</button>
              <button onClick={() => { setShowModal(false); setCurrentBlogId(); setReplyTargetId(null); }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
 );
}