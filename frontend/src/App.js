import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Authentication from './components/Authentication';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import MainLayout from './components/MainLayout';
import ParticleBg from './components/TsParticle';
import RecipeItemGrid from './components/RecipeItemGrid';
import RecipeModal from './components/RecipeModal';
import SearchContainer from './components/search/SearchContainer';
import NavigationBar from './components/NavigationBar';

function App() {

  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCardClick = (RecipeName) => {
      setActiveModal(RecipeName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleLogin = (email, password) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

const HomePage = () => (
  <div>
    <NavigationBar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
    <SearchContainer />
    <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} />
    {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} />}
  </div>
);

 return (

    <BrowserRouter>
      <MainLayout>
      
        <ParticleBg />
        <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/loginForm" />} />
        <Route 
          path="/login" 
          element={<Authentication onLogin={handleLogin} />} 
        />
           <Route path="/LoginForm" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm onAuthenticate={handleLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} /> 
          {/* <Route path="/Liked-Recipe" element={<LikedRecipe />} /> */}
          {/* Redirect all undefined paths to the login form */}
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
       
        </Routes>
        {isLoggedIn && <ParticleBg />}
        
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
