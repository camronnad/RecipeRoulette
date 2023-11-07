import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import Axios from 'axios';
import LikedRecipe from './LikedRecipe';
const SimilarRecipesCard = ({ similarRecipes, isFlipped, setIsFlipped }) => {
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [isFlippedArray, setIsFlippedArray] = useState(similarRecipes.map(() => false));

  const handleFlipClick = (outerIndex) => {
    const updatedIsFlippedArray = [...isFlippedArray];
    updatedIsFlippedArray[outerIndex] = !updatedIsFlippedArray[outerIndex];
    setIsFlippedArray(updatedIsFlippedArray);
  };
  // {detailedInfo && (
  //   <div>
  //     <h3>{detailedInfo.title}</h3>
  //     <p>Ingredients: {detailedInfo.extendedIngredients.map(ingredient => ingredient.original)}</p>
  //     <p>Instructions: {detailedInfo.instructions}</p>
  //     {/* Add more detailed information as needed */}
  //   </div>
  // )}
  console.log("similar recipes in card component", similarRecipes);

  useEffect(() => {
    console.log("isFlipped value in SimilarRecipesCard:", isFlipped);
  }, [isFlipped]); // Use useEffect to log changes in isFlipped

  const handleViewDetails = (recipeId, outerIndex) => {
    Axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: 'c643c25907e64db3b626cf189c0d0e0b',
        includeNutrition: false,
      },
    })
      .then((response) => {
        const detailedRecipe = response.data;
        console.log("detailed reciepes in simlar recipes card", detailedRecipe);
        setDetailedInfo(detailedRecipe);
        console.log("detailed info state in simlar recipes card", detailedInfo);
        console.log("");
        const updatedIsFlippedArray = [...isFlippedArray];
        updatedIsFlippedArray[outerIndex] = !updatedIsFlippedArray[outerIndex]; // Toggle the value
        setIsFlippedArray(updatedIsFlippedArray);
      })
      .catch((error) => {
        console.error('Error fetching detailed recipe information:', error);
      });
  };


  return (
    <div>
      {similarRecipes.map((innerArray, outerIndex) => (
        <ReactCardFlip
          key={outerIndex}
          isFlipped={isFlippedArray[outerIndex]}
          flipDirection="horizontal"
        >
          {/* Front side of the card */}
          <div key={outerIndex}>
            {innerArray.map((recipe, innerIndex) => (
              <div
                style={{ height: "20vh", width: '15vw', margin: '0 auto', paddingLeft: "5px", marginBotton: "50px" }}
                key={innerIndex}
              >
                {/* Front side of the card for each recipe */}
                {recipe.title ? (
                  <>
                    <h3 style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>{recipe.title}</h3>
                    <br />
                    <img
                      src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
                      alt={`Image of ${recipe.title}`}
                      height={"250px"}
                      width={"250px"}

                    />
                    <br />
                    <p>Ready in {recipe.readyInMinutes} and serves {recipe.servings}</p>
                    {/* <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Link to Recipe
                    </a> */}
                    <button onClick={() => handleViewDetails(recipe.id, outerIndex)}>View Details</button>
                  </>
                ) : (
                  // Handle the case when properties are undefined
                  <p>Recipe information is not available</p>
                )}
                {/* <button onClick={handleFlipClick}>Flip Card {console.log("handleflipclick in card", handleFlipClick)}</button> */}
              </div>
            ))}
          </div>
          {/* Back side of the card  */}
          <div
            style={{ height: "25vh", width: '15vw', margin: '0 auto', borderTop: "1px solid black", paddingLeft: "5px" }}
          >
            {detailedInfo && (
              <div>
                <h3>{detailedInfo.title}</h3>
                <p>Ingredients:
                  <ul>
                    {detailedInfo.extendedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.original}</li>
                    ))}
                  </ul>
                </p>
                <p>Instructions: {detailedInfo.instructions}</p>
              </div>
            )}
            <button onClick={() => handleFlipClick(outerIndex)}>Flip Card</button>
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
};

export default SimilarRecipesCard;