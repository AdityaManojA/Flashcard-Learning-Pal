import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Allow = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoginClicked(true);
    if (!email.trim() || !password.trim()) {
      setError("Please fill all the fields.");
      setTimeout(() => setError(""), 2000); 
      return; 
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Extract the user ID
      // Store the user ID in localStorage
      localStorage.setItem('userId', userId);
      setLoggedIn(true); // Set login status to true on successful sign-in
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Invalid email or password.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={signIn}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="User" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        
        {/* Conditionally render Link based on login status */}
        {loggedIn ? (
          <Link to="/home" className="login-button">
            Log In
          </Link>
        ) : (
          <button type="submit" className="login-button">
            Log In
          </button>
        )}

        {loginClicked && error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};
