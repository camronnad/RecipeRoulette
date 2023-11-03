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
  const [modalFav, setModalFav] = useState(false);
  // const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };


  // const handleCardClick = (RecipeName, photo,) => {
  //   if (activeModal === null) {
  //     setActiveModal(RecipeName);
  //   }
  // };

  const handleFavClick = (isLiked, recipe) => {
    console.log("selected recipe.id", recipe.id);
    console.log(isLiked);
    if (isLiked) {
      axios.post('/api/saveLikeRecipe', {
        title: recipe.title,
        photo: recipe.image,
        recipeId: recipe.id,
        recipe_link: recipe.spoonacularSourceUrl,
        summary: recipe.summary
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
      axios.delete(`http://localhost:8080/api/saveLikeRecipe/${recipe.id}`)
        .then(() => {
          console.log("Recipe removed from favorites!");

        })
        .catch(error => {
          console.error("Error removing the recipe:", error);
        });
    }

  };
  const handleModalFav = () => {
    setModalFav(!modalFav);
    handleFavClick(modalFav, selectedRecipe);
  };
  // console.log("recipe data:", recipeData);
  return (
    <>
      <Card
        sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9 }}
        className="recipe_grid"
      >
        {!imgSpin &&
          <Grid container spacing={3} justifyContent="center">
            {recipeData.map((recipe, index) => (
              <Grid key={index} item xs={4}>
                <RecipeItem
                  handleFavClick={(isLiked) => { handleFavClick(isLiked, recipe); }}
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
          <button onClick={handleModalFav}><FavIcon selected={modalFav} /></button>
          <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
          <p>Ready In Minutes: {selectedRecipe.readyInMinutes}</p>
          <>Instructions: <br /> {selectedRecipe.instructions}</>
        </div>
      </RecipeModal>
    </>
  );
};

export default RecipeItemGrid;
