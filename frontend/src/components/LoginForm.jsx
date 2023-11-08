import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "../styles/LoginForm.scss";
import LoginReviews from "./LoginReviews";

const authenticateUser = async (email, password) => {
  try {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const result = await authenticateUser(email, password);
      console.log("data from login", result);
      localStorage.setItem("userId", result.user.id);

      if (result.message === 'Login successful') {
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <animated.div style={fade} className="login-form">
      <div className="reviews-container">
        <LoginReviews />
      </div>
      <div>
        <img src="RecipeRouletteLogo.png" className="logo" alt="Recipe Roulette Logo" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="emailInput">Email:</label>
            <input
              type="email"
              id="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="passwordInput">Password:</label>
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
