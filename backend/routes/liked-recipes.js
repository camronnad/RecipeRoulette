const express = require("express");
const router = express.Router();
const axios = require("axios");
const { pool } = require;

const likedRecipeRouter = (pool) => {

  router.get("/", (req, res) => {
    res.send("Hello world");
    // You can use a plain object as a response
    const response = { message: "Front end successfully connected to the server" };

    // Send the response as JSON
    res.json(response);
  });
  return router;
};


module.exports = { likedRecipeRouter, router };
