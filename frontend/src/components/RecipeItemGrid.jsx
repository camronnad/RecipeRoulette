import React from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card } from "@mui/material";



const RecipeItemGrid = ({ handleCardClick, activeModal, recipeData }) => {
  // Get random recipes
  console.log("recipe data:", recipeData);

  return (
    <Card
      sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9 }}
      className="recipe_grid"
    >
      <Grid container spacing={3} justifyContent="center">
        {recipeData.map((recipe, index) => (
          <Grid key={index} item xs={4}>
            <RecipeItem
              recipe_link={recipe.spoonacularSourceUrl}
              summary={recipe.summary}
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
