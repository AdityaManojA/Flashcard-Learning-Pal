import { auth } from  "../config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import '../login.css'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupClicked, setSignupClicked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signUp = async () => {
    setSignupClicked(true);
    if (!email.trim() || !password.trim()) {
      console.error("Please fill all the fields.");
      return; // Don't proceed if fields are not filled
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Extract the user ID
      // Optionally, you can store the user ID in localStorage or session storage for future use
      localStorage.setItem('userId', userId);
      // Redirect to the login page
      navigate("/login"); // Use navigate function instead of history.push
    } catch (err) {
      console.error(err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Sign up to FCP !</h3>

        <label htmlFor="username">Enter your Email</label>
        <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Enter your Password</label>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        
        <button type="button" className="login-button" onClick={signUp}>
          Sign up
        </button>

        {signupClicked && (!email.trim() || !password.trim()) && (
          <p style={{ color: 'red' }}>Please fill all the fields.</p>
        )}

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <div className="signup-link">
          <p  style={{ color: 'black' }}>Already have an account? <Link className="black" to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};
