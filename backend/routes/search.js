const express = require("express");
const axios = require("axios");
const router = express.Router();

const searchRouter = (pool) => {


  router.get('/', async (req, res) => {
    console.log(req.query);
    try {
      const query = req.query.query;
      const apiKey = process.env.APIKEY;
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=3`;

      
      const response = await axios.get(url);
      const data = response.data;
      const idsString = data.results.map(rec => rec.id).join(",");
      const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;
      const bulkResponse = await axios.get(bulkUrl);
      const bulkData = bulkResponse.data;
      
      res.json(bulkData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Server error');
    }
  });
  return router;
};

module.exports = { searchRouter, router };
