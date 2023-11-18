const express = require("express");
const router = express.Router();
const { pool } = require("../db/connect");
require("dotenv").config();
const { queryTopLikedRecipes } = require("../models/ratingLikedRecipesModel");

const topLikedRecipes = (pool) => {
  router.get("/", (req, res) => {
    queryTopLikedRecipes()
      .then((topRecipes) => {
        res.json(topRecipes);
      })
      .catch((error) => {
        console.error("Error querying users:", error);
        res
          .status(500)
          .json({ error: "An error occurred while querying users" });
      });
  });

  return router;
};

module.exports = { topLikedRecipes, router };
