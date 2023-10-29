import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Signup from './Signup';

const Authentication = ({ onLogin }) => {
   const navigate = useNavigate();

  const authenticateUser = (username, password) => {
   const isAuthenticated = true; 
    if (isAuthenticated) {
      onLogin(); 
      navigate('/'); 
    } else {
      
    }
  };
  return (
    <Routes>
 <Route path="/LoginForm" element={<LoginForm onAuthenticate={authenticateUser} />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default Authentication;
