import React, { useState } from 'react';
import RecipeItemGrid from './components/RecipeItemGrid';
import RecipeModal from './components/RecipeModal';
import SearchContainer from './components/search/SearchContainer';
import NavigationBar from './components/NavigationBar';


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

  return (
    <div className="App">  
      <NavigationBar /> 
      <SearchContainer setRecipeData={setRecipeData} />
      <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} recipeData={recipeData}/>
      {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} recipeData={recipeData}/>}
    </div>
  );
}

export default App;
