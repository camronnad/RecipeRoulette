const express = require("express");
const router = express.Router();
const axios = require("axios");
const { pool } = require;

const searchRouter = (pool) => {
  //const searchQuery = req.query.searchQuery;

  //   router.get("/", (req, res) => {
  //     // You can use a plain object as a response
  //     const response = { message: "Front end successfully connected to the server" };

  //     // Send the response as JSON
  //     res.json(response);
  //   });
  //   return router;
  // };



  router.get('/', async (req, res) => {
    try {
      // Capture the search query from the front-end
      const query = req.query.query;
      const apiKey = process.env.APIKEY;
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

      // Fetch the recipe data
      const response = await axios.get(url);
      const data = response.data;

      // Send recipe data back to the front-end
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Server error');
    }
  });
  return router;
};

module.exports = { searchRouter, router };
