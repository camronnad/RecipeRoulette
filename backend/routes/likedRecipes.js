const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require('dotenv').config();



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

});

router.post('/', async (req, res) => {
  const { title, photo, recipeId } = req.body;
 
  if (!title || !photo) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
 
    await pool.query(
      `INSERT INTO likedRecipes (user_id, title, photo_url, recipe_id) VALUES ($1, $2, $3, $4)`,
      [1, title, photo, recipeId]
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

    await pool.query('DELETE FROM likedRecipes WHERE recipe_id = $1', [recipeId]);
    res.status(200).send('Recipe successfully deleted!')
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Internal Server Error.');
  }

})

module.exports = router;
