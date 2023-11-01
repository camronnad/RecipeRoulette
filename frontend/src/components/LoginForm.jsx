import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../styles/LoginForm.scss';

const LoginForm = ({ onAuthenticate }) => {  // onAuthenticate is received from props
  let navigate = useNavigate(); // hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 }
  });

  const handleLogin = (e) => {
    e.preventDefault(); 
 
    if (typeof onAuthenticate === 'function') {
      onAuthenticate(email, password);
    } else {
      console.error("onAuthenticate is not provided or not a function");
    }
  };

  const goToSignup = () => {
    navigate('/Signup'); // navigate to Signup page
  };

  return (
    
    <animated.div style={fade} className="login-form">
      <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>  {/* handleLogin is called when the form is submitted */}
        <div className="input-group">
          <label htmlFor="emailInput">Email:</label>
          <input 
            type="email" 
            id="emailInput" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}  // store current value in the email state
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput">Password:</label>
          <input 
            type="password" 
            id="passwordInput" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  // store current value in the password state
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
      <button onClick={goToSignup} className="switch-form-button">Create new account</button>
      </div>
    </animated.div>
  );
};

export default LoginForm;
