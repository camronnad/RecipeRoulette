import React from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card } from "@mui/material";

const getRandomIndices = (length) => {
  let indices = [];
  while (indices.length < 3) {
    console.log(indices);
    let randomIndex = Math.floor(Math.random() * length);
    if (!indices.includes(randomIndex)) indices.push(randomIndex);
  }

  return indices;
};

const RecipeItemGrid = ({ handleCardClick, activeModal, recipeData }) => {
  // Get random recipes
  console.log("recipe data:", recipeData);
  const randomIndices = recipeData.length > 0 ? getRandomIndices(recipeData.length) : [];
  const randomRecipes = randomIndices.map(index => recipeData[index]);
  return (
    <Card
      sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9 }}
      className="recipe_grid"
    >
      <Grid container spacing={3} justifyContent="center">
        {randomRecipes.map((recipe, index) => (
          <Grid key={index} item xs={4}>
            <RecipeItem

              photo={recipe.image}
              RecipeName={recipe.title}
              handleCardClick={handleCardClick}
              activeModal={activeModal}
              recipeId={recipe.id}
            />
          </Grid>
        ))}
      </Grid>
    </Card >
  );
};

export default RecipeItemGrid;
