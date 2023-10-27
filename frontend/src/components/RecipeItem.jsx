import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavIcon from "./FavIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RecipeItem({
  photo,
  RecipeName,
  handleCardClick,
  activeModal,
}) {
  const clickHandler = () => {
    if (activeModal === null) {
      handleCardClick(RecipeName);
    }
  };

  const handleFavClick = () => {
   
    fetch('/api/saveLikedRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeName: RecipeName, photo: photo }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        console.log("Recipe saved to liked recipes!");
      } else {
        console.error("Failed to save liked recipe:", data.error);
      }
    });
  };

  return (
    <Card
      className="Card-item"
      sx={{ maxWidth: 245, borderRadius: 5, position: "relative" }}
      onClick={clickHandler}
    >
      <Box sx={{ position: "absolute", right: -2, bottom: 170, p: 1 }}>
        <FavIcon onFavCLick={handleFavClick}/>
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
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {RecipeName}
        </Typography>
      </Box>
    </Card>
  );
}
