import React, { useState } from "react";
import LikedRecipe from "./LikedRecipe";

const mockData = [
  {
    id: 1,
    imgSrc: "/mushroomPasta.png",
    name: "Mushroom Pasta",
    description: "Delicious mushroom pasta with creamy sauce.",
  },
  {
    id: 2,
    imgSrc: "/ButterChicken.png",
    name: "Butter Chicken",
    description: "Delicious butter chicken with creamy sauce.",
  },
  {
    id: 3,
    imgSrc: "/BuddhaBowl.png",
    name: "Buddha Bowl",
    description: "Delicious buddha bowl with creamy sauce.",
  }
  // Add more recipe objects as needed
];

const RecipeCardList = (props) => {


  return (
    <div>
      {
        mockData.map(recipe => (
          <LikedRecipe {...recipe} key={recipe.id} handleCardClick={props.handleCardClick} activeModal={props.activeModal} />))
      }
    </div>
  );
};

export default RecipeCardList;
