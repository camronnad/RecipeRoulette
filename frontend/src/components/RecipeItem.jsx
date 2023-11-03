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
  onFavClick,
  setModalOpen,
  handleFavClick,
  setSelectedRecipe,
  recipe
}) {

  const [selectedColor, setSelectedColor] = useState(false);






  // console.log("recipe passed down to recipeitem", recipe);
  // console.log("recipe passed downn with id", recipe.id);


  // function FavIconEnhanced({ onFavClick, onClick }) {
  //   return (
  //     <div onClick={onClick}>
  //       <FavIconEnhanced onFavClick={handleFavClick}
  //         onClick={e => e.stopPropagation()} />
  //     </div>
  //   );
  // }

  // const [isModalOpen, setModalOpen] = useState(false);

  const clickHandler = (event) => {
    console.log("event target", event.target);
    setSelectedRecipe(recipe);
    if (event.target.tagName === "path") {
      handleFavClick(!selectedColor);
      setSelectedColor(!selectedColor);
      return;
    }
    setModalOpen(true);

    // console.log("clickHandler running", activeModal);
    // setSelectedRecipe(recipe);
    // console.log("set selected recipe is called", recipe);
    // console.log("set selected recipe is called with id", recipe.id);

    // // event.stopPropagation();
    // // if (activeModal === null) {
    // // handleCardClick(RecipeName);
    // setModalOpen(true);
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
          <FavIcon selected={selectedColor} />
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
