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


  const cardStyle = {
    width: "500px",
    maxHeight: '600px',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: "20px",
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #ddd', // subtle border
  };
  
  const titleStyle = {
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: '5px',
    margin: '10px 0',
  };
  
  const imageStyle = {
    display: 'block', // to center the image
    marginLeft: 'auto',
    marginRight: 'auto',
    height: "300px",
    width: "400px",
    borderRadius: '5px', // rounding the corners of the image
  };
  
  const buttonStyle = {
    display: 'block', // to center the button
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
  // Inside your component's return statement
  return (
    <div>
      {similarRecipes.map((innerArray, outerIndex) => (
        <ReactCardFlip key={outerIndex} isFlipped={isFlippedArray[outerIndex]} flipDirection="horizontal">
          {/* Front side of the card */}
          <div key={outerIndex}>
            {innerArray.map((recipe, innerIndex) => (
              <div style={cardStyle} key={innerIndex}>
                {/* Front side of the card for each recipe */}
                {recipe.title ? (
                  <>
                    <h3 style={titleStyle}>{recipe.title}</h3>
                    <img
                      src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
                      alt={`Image of ${recipe.title}`}
                      style={imageStyle}
                    />
                    <p style={{ textAlign: 'center' }}>Ready in {recipe.readyInMinutes} and serves {recipe.servings}</p>
                    <button onClick={() => handleViewDetails(recipe.id, outerIndex)} style={buttonStyle}>View Details</button>
                  </>
                ) : (
                  <p>Recipe information is not available</p>
                )}
              </div>
            ))}
          </div>
          {/* Back side of the card */}
          <div style={{ ...cardStyle, maxHeight: '400px' }}>
            {detailedInfo && (
              <div>
                <h3 style={titleStyle}>{detailedInfo.title}</h3>
                <p>Ingredients:
                  <ul style={{ listStyleType: 'none', padding: '0 20px' }}>
                    {detailedInfo.extendedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.original}</li>
                    ))}
                  </ul>
                </p>
                <p style={{ padding: '0 20px' }}>Instructions: {detailedInfo.instructions}</p>
              </div>
            )}
            <button onClick={() => handleFlipClick(outerIndex)} style={buttonStyle}>Flip Card</button>
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
  
};

export default SimilarRecipesCard;