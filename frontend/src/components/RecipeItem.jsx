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
  likedItems,
  handleFavIconClick,
  selectedColor,
  recipeId,
  recipe_link,
  summary,
  onFavClick,
  setModalOpen,
  handleFavClick,
  setSelectedRecipe,
  recipe,
  toggleLiked
}) {

  const clickHandler = (event) => {
    setSelectedRecipe(recipe);
    if (event.target.tagName === "path") {
      toggleLiked(recipe);
      return;
    } else {
      setModalOpen(true);
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
          <FavIcon selected={likedItems.includes(recipeId)} />
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

