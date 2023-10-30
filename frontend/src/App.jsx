import React, { useState } from 'react';

import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LikedRecipe from './components/LikedRecipe';
import RecipeCardList from './components/RecipeCardList';
import HomeRoute from './routes/HomeRoute';

function App() {

  //openLikedModal={openLikedModal} closeLikedModal={closeLikedModal}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Liked-Recipe" element={<LikedRecipe />} />
          <Route
            path="*"
            element={
              <>
                <HomeRoute />
              </>
            }
          />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
