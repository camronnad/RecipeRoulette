import React, { useState } from 'react';
import RecipeItemGrid from './components/RecipeItemGrid';
import RecipeModal from './components/RecipeModal';
import SearchContainer from './components/search/SearchContainer';
import NavigationBar from './components/NavigationBar';

import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LikedRecipe from './components/LikedRecipe';
import RecipeCardList from './components/RecipeCardList';

function App() {

  const [activeModal, setActiveModal] = useState(null);
  const [recipeData, setRecipeData] = useState([]);

  const handleCardClick = (RecipeName, photo,) => {
    if (activeModal === null) {
      setActiveModal(RecipeName);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };
  //openLikedModal={openLikedModal} closeLikedModal={closeLikedModal}

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/Liked-Recipe" element={<LikedRecipe />} />
          <Route
            path="*"
            element={
              <>
                <SearchContainer setRecipeData={setRecipeData} />
                <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} recipeData={recipeData} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>

      {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} recipeData={recipeData} />}
    </div>
  );
}

export default App;
