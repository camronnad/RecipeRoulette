import React, { useState } from 'react';
import RecipeModal from '../components/RecipeModal';
import SearchContainer from '../components/search/SearchContainer';
import NavigationBar from '../components/NavigationBar';
import RecipeItemGrid from '../components/RecipeItemGrid';


export default function HomeRoute({ isLoggedIn, setIsLoggedIn }) {

  // const [activeModal, setActiveModal] = useState(null);
  const [recipeData, setRecipeData] = useState([]);
  const [imgSpin, setImgSpin] = useState(false);


  // const handleCloseModal = () => {
  //   setActiveModal(null);
  // };

  //handleCardClick={handleCardClick} activeModal={activeModal}

  return (
    <div className="App" style={{
      backgroundImage: `url(/HomeRouteImg.png)`, backgroundSize: '100%', // or 'contain', or '100% 50%', etc.
      backgroundRepeat: 'no-repeat'
    }}>
      <SearchContainer setRecipeData={setRecipeData} setImgSpin={setImgSpin} imgSpin={imgSpin} />
      <RecipeItemGrid recipeData={recipeData} imgSpin={imgSpin} />
      {/* {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} recipeData={recipeData}/>} */}
    </div>
  );
}