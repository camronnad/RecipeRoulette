import React, { useState } from 'react';
import RecipeItemGrid from './components/RecipeItemGrid';
import RecipeModal from './components/RecipeModal';
import SearchContainer from './components/search/SearchContainer';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LikedRecipe from './components/LikedRecipe';
import RecipeCardList from './components/RecipeCardList';

function App() {

  //const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [imgSpin, setImgSpin] = useState(false);
  const [likedModalOpen, setLikedModalOpen] = useState(false);
  //const [likedRecipes, setLikedRecipes] = useState([]); // Replace with your Liked Recipes data
  const handleCardClick = (RecipeName, photo,) => {

    if (activeModal === null) {
      setActiveModal(RecipeName);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };


  const openLikedModal = () => {
    setLikedModalOpen(true);
  };

  const closeLikedModal = () => {
    setLikedModalOpen(false);
  };
  const mockPhoto = "mushroomPasta.png";
  return (

    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/Liked-Recipe" element={<LikedRecipe openLikedModal={openLikedModal} closeLikedModal={closeLikedModal} />} />
          <Route
            path="*"
            element={
              <>
                <SearchContainer imgSpin={imgSpin} setImgSpin={setImgSpin} />
                <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      {activeModal && (
        <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} />
      )}
      {/* recipes={likedRecipes} */}
      {/* Display Liked Recipes in a modal */}
      {likedModalOpen && (
        <RecipeModal
          RecipeName="Liked Recipes"
          photo={"mushroomPasta.png"}
          onClose={closeLikedModal}
        >
          <LikedRecipe photo={mockPhoto} />
          {/* <RecipeCardList /> */}
        </RecipeModal>
      )}
    </div>
  );
}

export default App;
