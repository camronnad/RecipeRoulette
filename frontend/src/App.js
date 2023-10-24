import React, { useState } from 'react';
import RecipeItemGrid from './components/RecipeItemGrid';
import RecipeModal from './components/RecipeModal';
import SearchContainer from './components/search/SearchContainer';
function App() {

  const [activeModal, setActiveModal] = useState(null);

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
      <RecipeItemGrid handleCardClick={handleCardClick} activeModal={activeModal} />
      {activeModal && <RecipeModal RecipeName={activeModal} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
