import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import MainLayout from './components/MainLayout';
import ParticleBg from './components/TsParticle'
function App() {
  return (
    <div>
      
         <BrowserRouter>
         <MainLayout>
         <ParticleBg />
      <Routes>
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/LoginForm" />} />
        <Route path="*" element={<Navigate to="/LoginForm" />} /> {/* This line ensures all undefined paths redirect to the login form. */}
      </Routes>
      </MainLayout>
    </BrowserRouter>
    </div>
  );
}

export default App;
