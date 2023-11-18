import React, { useState } from 'react';
import SearchContainer from '../components/search/SearchContainer';
import RecipeItemGrid from '../components/RecipeItemGrid';
import { animated } from "react-spring";


export default function HomeRoute({ isLoggedIn, setIsLoggedIn }) {

  const [recipeData, setRecipeData] = useState([]);
  const [imgSpin, setImgSpin] = useState(false);


  return (
    <animated.div className="App">  
      <SearchContainer setRecipeData={setRecipeData} setImgSpin={setImgSpin} imgSpin={imgSpin} />
      <RecipeItemGrid recipeData={recipeData} imgSpin={imgSpin} />
    </animated.div>
  );
}