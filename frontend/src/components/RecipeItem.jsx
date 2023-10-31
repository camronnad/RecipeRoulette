import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavIcon from "./FavIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import '../styles/RecipeModal.scss';
import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeItem({
  photo,
  RecipeName,
  handleCardClick,
  activeModal,
  recipeId,
  instructions,
  readyInMinutes
}) {

  const [isModalOpen, setModalOpen] = useState(false);

  const clickHandler = (event) => {
    event.stopPropagation();
    if (activeModal === null) {
      handleCardClick(RecipeName);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFavClick = (isLiked) => {
    console.log(isLiked);
    if (isLiked) {
      axios.post('/api/saveLikeRecipe', {
        title: RecipeName,
        photo,
        recipeId
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
      axios.delete(`http://localhost:8080/api/saveLikeRecipe/${recipeId}`)
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
        className="Card-item"
        sx={{ maxWidth: 245, borderRadius: 5, position: "relative" }}
        onClick={clickHandler}
      >
        <Box sx={{ position: "absolute", right: -2, bottom: 170, p: 1 }}>
          <FavIcon onFavCLick={handleFavClick} />
        </Box>
        <CardMedia component="img" height="194" src={photo} alt="Recipe Image" />
        <Box
          sx={{
            height: "35px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: '0.8em' }}>
            {RecipeName}
          </Typography>
        </Box>
      </Card>
      <RecipeModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <button className="modal-close-btn" onClick={closeModal}>×</button>
          <h2 className="modal-title">Recipe Name: {RecipeName}</h2>
          <img className="modal-img" src={photo} alt="Recipe Image" />
          <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
          <p>Ready In Minutes: {readyInMinutes}</p>
          <p>Instructions: <br/> {instructions}</p>
        </div>
      </RecipeModal>

    </>
  );
}
