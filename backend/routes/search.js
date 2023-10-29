const express = require("express");
const axios = require("axios");
const router = express.Router();

const searchRouter = () => {
  router.get('/', async (req, res) => {
    try {
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
