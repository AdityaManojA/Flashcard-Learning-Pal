import { auth } from  "../config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import '../login.css'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    setLoginClicked(true);
    if (!email.trim() || !password.trim()) {
      console.error("Please fill all the fields.");
      return; // Don't proceed if fields are not filled
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
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
        
        <button type="button" className="login-button" onClick={signIn}>
          <Link to='/login' className="login">Sign up</Link>
        </button>

        {loginClicked && (!email.trim() || !password.trim()) && (
          <p style={{ color: 'red' }}>Please fill all the fields.</p>
        )}

        <div className="signup-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};
