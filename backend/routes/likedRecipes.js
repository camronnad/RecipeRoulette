const express = require("express");
const router = express.Router();
const { pool } = require("../db/connect");
require('dotenv').config();

router.post('/', async (req, res) => {
  const { title, recipe_link, summary, photo, instructions, readyInMinutes, recipeId } = req.body;
  console.log("recipe id ", recipeId);
  console.log("req body", req.body);
  if (!title || !recipe_link || !summary || !photo || !instructions || !readyInMinutes) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    await pool.query(
      `INSERT INTO likedRecipes (title, recipe_link, summary, photo_url, recipe_id, instructions, readyInMinutes, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [title, recipe_link, summary, photo, recipeId, instructions, readyInMinutes, 2]
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
