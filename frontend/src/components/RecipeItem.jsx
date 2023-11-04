import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavIcon from "./FavIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import '../styles/RecipeModal.scss';
import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeItem({
  photo,
  RecipeName,
  handleCardClick,
  activeModal,
  recipeId,
  recipe_link,
  summary,
  setModalOpen,
  handleFavClick,
  setSelectedRecipe,
  recipe
}) {

  function FavIconEnhanced({ onFavCLick, onClick }) {
    return (
      <div onClick={onClick}>
        <FavIconEnhanced onFavCLick={handleFavClick}
          onClick={e => e.stopPropagation()} />
      </div>
    );
  }

  const clickHandler = (event) => {
    event.stopPropagation();
    // if (activeModal === null) {
      console.log("hello")
      handleCardClick(RecipeName);
      setModalOpen(true);
      setSelectedRecipe(recipe);
      
    // }
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
    </>
  );
};
