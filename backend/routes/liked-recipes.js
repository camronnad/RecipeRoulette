const { pool } = require("../db/connect");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { queryAllLikedRecipes } = require("../models/LikedRecipesModel.js");
const {
  queryDeleteLikedRecipes,
} = require("../models/deleteLikedRecipesModel");
const {
  queryRatingLikedRecipes,
} = require("../models/ratingLikedRecipesModel");

const likedRecipeRouter = (pool) => {
  router.get("/", (req, res) => {
    const userId = req.query.userId;
    console.log("query liked recipe id", userId);

    queryAllLikedRecipes(userId)
      .then((likedRecipes) => {
        res.json(likedRecipes);
      })
      .catch((error) => {
        console.error("Error querying users:", error);
        res
          .status(500)
          .json({ error: "An error occurred while querying users" });
      });
  });

  router.get("/:id", (req, res) => {
    const recipeId = req.params.id;
  });

  router.put("/rate/:id", async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.body.userId;
    console.log("user id from browser", userId);
    const rating = req.body.rating;

    queryRatingLikedRecipes(rating, userId, recipeId)
      .then(() => {
        res.status(200).json({ message: "Rating updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  router.get("/similar/:id", (req, res) => {
    const recipeId = req.params.id;
    const numberOfRecipes = 1;
    const apiKey = process.env.APIKEY;

   
    axios
      .get(`https://api.spoonacular.com/recipes/${recipeId}/similar`, {
        params: {
          apiKey,
          number: numberOfRecipes,
        },
      })
      .then((response) => {
        const similarRecipes = response.data;
        console.log("simlar recipes backend", similarRecipes);
        res.json(similarRecipes);
      })
      .catch((error) => {
        console.error(
          "Error fetching similar recipes from Spoonacular:",
          error
        );
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  router.delete("/:id", async (req, res) => {
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
