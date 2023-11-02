import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Signup from './Signup';

const Authentication = ({ onLogin }) => {
  const navigate = useNavigate();

  const authenticateUser = async (email, password) => {
    try {
      // Replace '/api/authenticate' with your actual authentication endpoint
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

       if (data.success) {
        onLogin(); 
        navigate('/');

        console.error('Authentication failed: Invalid credentials');
        
      }
    } catch (error) {
      // Handle errors such as no network connection, server down, etc.
      console.error('Authentication request failed', error);
      // You can set some state here to show an error message in your UI
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginForm onAuthenticate={authenticateUser} />} />
      <Route path="/signup" element={<Signup />} />
      {/* ...other routes */}
    </Routes>
  );
};

export default Authentication;
