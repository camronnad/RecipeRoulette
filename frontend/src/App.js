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
  const handleCardClick = (RecipeName, photo,) => {
    if (activeModal === null) {
      setActiveModal(RecipeName);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/Liked-Recipe" element={<RecipeCardList />} />
          <Route path="*" element={<><SearchContainer imgSpin={imgSpin} setImgSpin={setImgSpin} /><RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} /></>} />
        </Routes>
      </BrowserRouter>
      {/* <SearchContainer />
      <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} /> */}
      {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
