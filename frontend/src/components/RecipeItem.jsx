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
  // handleCardClick,
  // activeModal,
  // recipeId,
  // instructions,
  // readyInMinutes,
  recipeId,
  recipe_link,
  summary,
  setModalOpen,
  handleFavClick,
  setSelectedRecipe,
  recipe
}) {

  function FavIconEnhanced({ onFavClick, onClick }) {
    return (
      <div onClick={onClick}>
        <FavIconEnhanced onFavClick={handleFavClick}
          onClick={e => e.stopPropagation()} />
      </div>
    );
  }

  // const [isModalOpen, setModalOpen] = useState(false);

  const clickHandler = (event) => {
    // console.log("clickHandler running", activeModal);
    event.stopPropagation();
    // if (activeModal === null) {
    // handleCardClick(RecipeName);
    setModalOpen(true);
    console.log("set selected recipe is called", recipe);
    setSelectedRecipe(recipe);
    // }
  };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const handleFavClick = (isLiked) => {
  //   console.log(isLiked);
  //   if (isLiked) {
  //     axios.post('/api/saveLikeRecipe', {
  //       title: RecipeName,
  //       photo,
  //       recipeId
  //     })
  //       .then(response => {

  //   if (response.data.message) {
  //     console.log("Recipe saved to liked recipes!");
  //   } else {
  //     console.error("Failed to save liked recipe:", response.data.error);
  //   }
  // })
  //         .catch (error => {
  //   console.error("Error making the API call:", error);
  // });
  //       }

  //   } else {
  //     axios.delete(`http://localhost:8080/api/saveLikeRecipe/${recipeId}`)
  //       .then(() => {
  //         console.log("Recipe removed from favorites!");

  //       })
  //       .catch(error => {
  //         console.error("Error removing the recipe:", error);
  //       });
  //   }

  // };
  // try to figure out why onclick is triggering modal even when hearting card

  return (
    <>
      <Card
        className="Card-item"
        sx={{ maxWidth: 245, borderRadius: 5, position: "relative" }}
        onClick={clickHandler}
      >
        <Box sx={{ position: "absolute", right: -2, bottom: 170, p: 1 }}>
          <FavIcon onFavClick={handleFavClick} />
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
