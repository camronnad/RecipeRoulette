import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import '../styles/LoginForm.scss';  
const LoginForm = () => {
  let navigate = useNavigate(); // hook for navigation

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 }
  });


  const goToSignup = () => {
    navigate('/Signup'); // navigate to Signup page
  };

  return (
    
    <animated.div style={fade}  className="login-form">
      <h2>Login</h2>
      <form>
        <div className="input-group">
          <label htmlFor="emailInput">Email:</label>
          <input type="email" id="emailInput" placeholder="Email" />
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput">Password:</label>
          <input type="password" id="passwordInput" placeholder="Password" />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
      <button onClick={goToSignup} className="switch-form-button">Create new account</button>
      </animated.div>
  );
};

export default LoginForm;
