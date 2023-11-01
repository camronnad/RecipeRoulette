const express = require("express");
const router = express.Router();
const { pool } = require("../db/connect");
require('dotenv').config();


// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,

// });

router.post('/', async (req, res) => {
  const { title, recipe_link, summary, photo, recipeId } = req.body;

  if (!title || !recipe_link || !summary || !photo) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    await pool.query(
      `INSERT INTO likedRecipes (title, recipe_link, summary, photo_url, recipe_id, user_id ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, recipe_link, summary, photo, recipeId, 1]
    );

    res.status(200).json({ message: 'Successfully added to liked recipes.' });
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }

});

router.delete('/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  console.log(recipeId);
  try {

    console.log("server call made");

    await pool.query('DELETE FROM likedRecipes WHERE recipe_id = $1', [recipeId]);
    console.log("query function called");
    console.log("deleting recipeId", recipeId);

    res.status(200).send('Recipe successfully deleted!');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Internal Server Error.');
  }

});

module.exports = router;
