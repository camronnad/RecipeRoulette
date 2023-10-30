import React, { useState } from 'react';
import SearchButton from './SearchButton';
import SearchBar from './SearchBar';
import '/home/labber/RecipeRoulette/frontend/src/Search.css';

function SearchContainer(props) {
  const [imgSpin, setImgSpin] = useState(false);
  const handleClick = () => {
    setImgSpin(!imgSpin);
  };
  return (
    <div className='wrapper'>
      <div className='rouletteSearchBar'>
        <div className='rouletteSearch'>
          {!imgSpin &&
            <div>
              <img src="roulette.jpg" alt="Roulette Image" height="500px" width="500px" />
            </div>}
          {imgSpin &&
            <div>
              <img src="roulette.jpg" className='roulette' alt="Roulette Image" height="500px" width="500px" />
            </div>}
        </div>
      </div>
      <div className='searchBar'>

        <SearchBar label="SPIN" onClick={handleClick} />
      </div>
      <div className='spinBlurb'>
        {/* <img src="recipeIcon.jpg" alt="recipe icon" height="300px" width={400} /> */}
        <h1>Give it a Spin!</h1>
        <img src="pots.jpg" alt="pots" />

        <p>
          "Discover the culinary world at your fingertips with our recipe-generating app.
          Say goodbye to the days of searching through cookbooks or endlessly scrolling through countless web pages.
          Our user-friendly platform simplifies the quest for the perfect meal, making it easier and more enjoyable than ever.
        </p>
        <p>
          Whether you're in the mood for a quick weeknight dinner, exploring international cuisines, or looking to make the most of ingredients in your pantry,
          our app has you covered. Simply input your preferences, dietary needs, or the ingredients you have on hand, and let the magic happen.
          Watch as a treasure trove of mouthwatering dishes tailored to your tastes emerges before your eyes.
        </p>
        <p>
          But that's not all. Save your favorite recipes, create shopping lists, and connect with a community of food enthusiasts who share your passion for great meals. Elevate your culinary skills, expand your palate, and embark on a delicious journey in your own kitchen. With our recipe-generating app, every meal is an adventure waiting to be savored."
        </p>
      </div>

    </div>
  );
};

export default SearchContainer;