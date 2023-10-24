const express = require("express");
const router = express.Router();
const { pool } = require;

const searchRouter = (pool) => {
  //const searchQuery = req.query.searchQuery;

  router.get("/", (req, res) => {
    // You can use a plain object as a response
    const response = { message: "Front end successfully connected to the server" };

    // Send the response as JSON
    res.json(response);
  });
  return router;
};
module.exports = { searchRouter, router };
