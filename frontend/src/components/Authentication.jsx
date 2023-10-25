import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Signup from './Signup';

const Authentication = () => {
  return (
    <Routes>
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default Authentication;
