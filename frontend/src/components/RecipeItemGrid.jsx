import React from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card } from "@mui/material";


const RecipeItemGrid = ({ handleCardClick, activeModal, recipeData }) => {
  return (
    <Card sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9 }} className="recipe_grid">
      <Grid container spacing={3} justifyContent="center">
        {recipeData && recipeData.results && recipeData.results.slice(0, 3).map((recipe, index) => (
          <Grid key={index} item xs={4}>
            <RecipeItem
              photo={recipe.image}
              RecipeName={recipe.title}
              handleCardClick={handleCardClick}
              activeModal={activeModal}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default RecipeItemGrid;
