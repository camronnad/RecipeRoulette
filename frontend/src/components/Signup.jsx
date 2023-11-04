import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../styles/Signup.scss';  

const SignupForm = () => {
  const navigate = useNavigate(); 

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 }
  });


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup form submitted!");
if (password !== confirmPassword){
  alert("Passwords do not match");
  return;
}

 try {
  const response = await fetch('/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName,
      email,
      password
    })
  });

  const data = await response.json();

  if (data.userId) {
    console.log("Signup successful! User ID:", data.userId);
    navigate('/LoginForm');
  } else {
    console.error("Error signing up:", data.error);
  }
} catch (error) {
  console.error("There was an error:", error);
}
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const haveAccount = () => {
    navigate('/LoginForm');
  };

  return (
    <animated.div style={fade} className="signup-form">
<div className="form-container">
      <h2>Sign Up</h2>
      <form  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      <button onClick={haveAccount} className="switch-form-button">Already have an account? Log In</button>
      </div>
      </animated.div>
  );
};

export default SignupForm;
