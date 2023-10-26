const express = require("express");
const router = express.Router();
const axios = require("axios");
const { pool } = require;
const { queryAllLikedRecipes } = require("../models/LikedRecipesModel.js");

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
  return router;
};

module.exports = { likedRecipeRouter, router };
