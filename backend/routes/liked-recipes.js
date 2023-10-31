const { pool } = require("../db/connect");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { queryAllLikedRecipes } = require("../models/LikedRecipesModel.js");
const { queryDeleteLikedRecipes } = require("../models/deleteLikedRecipesModel");
const { queryRatingLikedRecipes } = require("../models/ratingLikedRecipesModel");

const likedRecipeRouter = (pool) => {

  router.get("/", (req, res) => {
    queryAllLikedRecipes()
      .then(likedRecipes => {
        console.log("query all liked recipes:", likedRecipes);

        // Send the response as JSON with the query results
        res.json(likedRecipes);
      })
      .catch(error => {
        console.error("Error querying users:", error);
        res.status(500).json({ error: "An error occurred while querying users" });
      });
  });
  // get id route

  router.get('/:id', (req, res) => {
    const recipeId = req.params.id;
    // Query the database to retrieve the recipe details based on recipeId
    // Return the recipe details in the response
  });
  //const deleteLikedRecipeRouter = (pool) => {
  router.put('/rate/:id', async (req, res) => {
    const recipeId = req.params.id; // gets the id like above
    const userId = 1; // hardcoded user id
    const rating = req.body.rating; // gets the rating from the req body
    // should validate the above to make sure its a number between 1-5 eg

    console.log("Received PUT request for recipe ID:", recipeId);

    queryRatingLikedRecipes(rating, userId, recipeId)
      .then(() => {
        res.status(200).json({ message: 'Rating updated successfully' });
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  router.delete('/:id', async (req, res) => {
    const recipeId = req.params.id;

    console.log("Received delete request for recipe ID:", recipeId);

    queryDeleteLikedRecipes(recipeId)
      .then((deletedRecipe) => {
        if (deletedRecipe) {
          console.log("Recipe deleted successfully:", recipeId);
          res.status(204).send();
        } else {
          console.log("Recipe not found:", recipeId);
          res.status(404).json({ error: "Recipe not found" });
        }
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  return router;
};

module.exports = { likedRecipeRouter, router };