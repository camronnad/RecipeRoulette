const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios');
const {
  getAllUsers,
  getUserEmail,
  getUserPreferences,
  updateUserPreferences,
} = require("../controllers/UserController");
const { pool } = require("../db/connect");

router.get('/', getAllUsers);
router.post('/getUserEmail', getUserEmail);
router.get('/:userId/preferences', getUserPreferences);
router.post('/:userId/preferences', updateUserPreferences);

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate and sanitize input here

  // Check if user already exists
  const user = await getUserByEmail(email);
  if (user) {
    return res.status(409).json({ error: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [fullName, email, hashedPassword]
    );
    res.json({ userId: result.rows[0].id });
  } catch (error) {
    // Log the detailed error for developers
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});


// Function to build the query parameters string based on user preferences
function buildPreferenceQueryParams(preferences) {
  let queryParams = '';

  // Assuming 'preferences' is an object with keys like 'diet' and 'intolerances'
  if (preferences.diet) {
    queryParams += `&diet=${preferences.diet}`;
  }
  if (preferences.intolerances) {
    queryParams += `&intolerances=${preferences.intolerances.join(',')}`;
  }

  // Add more preferences handling as needed

  return queryParams;
}

// Route to get search results based on user preferences
router.get('/:userId/search', async (req, res) => {
  const userId = req.params.userId;
  console.log("user id from backend for preference", userId);
  const query = req.query.query; // Get the search term from the query parameter
  const apiKey = process.env.APIKEY; // Your Spoonacular API key should be in environment variables for security

  try {
    // Get user preferences
    const preferences = await getUserPreferences(userId);

    // Construct search query using Spoonacular API
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    // Append preferences to the query
    const preferenceParams = buildPreferenceQueryParams(preferences);
    url += preferenceParams;

    // Fetch the recipe data using axios
    const response = await axios.get(url);

    // Send recipe data back to the front-end
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
