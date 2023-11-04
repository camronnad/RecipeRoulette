import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card } from "@mui/material";
import RecipeModal from "./RecipeModal";
import axios from 'axios';
import FavIcon from "./FavIcon";


const RecipeItemGrid = ({ handleCardClick, activeModal, recipeData, imgSpin }) => {
  // Get random recipes
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFavClick = (isLiked) => {
    console.log(isLiked);
    if (isLiked) {
      axios.post('/api/saveLikeRecipe', {
        title: selectedRecipe.title,
        photo: selectedRecipe.photo,
        recipeId: selectedRecipe.recipeId,
        recipe_link: selectedRecipe.recipe_link,
        summary: selectedRecipe.summary
      })
        .then(response => {

          if (response.data.message) {
            console.log("Recipe saved to liked recipes!");
          } else {
            console.error("Failed to save liked recipe:", response.data.error);
          }
        })
        .catch(error => {
          console.error("Error making the API call:", error);
        });

    } else {
      axios.delete(`http://localhost:8080/api/saveLikeRecipe/${selectedRecipe.recipeId}`)
        .then(() => {
          console.log("Recipe removed from favorites!");

        })
        .catch(error => {
          console.error("Error removing the recipe:", error);
        });
    }

  };


  return (
    <>
      <Card
        sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9,backgroundColor: 'transparent',  // Making the background transparent
        boxShadow: 'none'  }}
        className="recipe_grid"
      >
        {!imgSpin &&
          <Grid container spacing={3} justifyContent="center">
            {recipeData.map((recipe, index) => (
              <Grid key={index} item xs={4}>
                <RecipeItem
                  handleFavClick={handleFavClick}
                  selectedRecipe={selectedRecipe}
                  setSelectedRecipe={setSelectedRecipe}
                  setModalOpen={setModalOpen}
                  photo={recipe.image}
                  RecipeName={recipe.title}
                  handleCardClick={handleCardClick}
                  activeModal={activeModal}
                  recipeId={recipe.id}
                  recipe={recipe}
                  recipe_link={recipe.spoonacularSourceUrl}
                  summary={recipe.summary}
                />
              </Grid>
            ))}
          </Grid>
        }
      </Card >

      <RecipeModal isOpen={isModalOpen} >
        <div className="modal-container">
          <button className="modal-close-btn" onClick={closeModal}>×</button>
          <h2 className="modal-title">Recipe Name: {selectedRecipe.title}</h2>
          <img className="modal-img" src={selectedRecipe.image} alt="Recipe Image" />
          <FavIcon onFavCLick={handleFavClick} />
          <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
          <p>Ready In Minutes: {selectedRecipe.readyInMinutes}</p>
          <>Instructions: <br /> {selectedRecipe.instructions}</>
        </div>
      </RecipeModal>
    </>
  );
};

export default RecipeItemGrid;
