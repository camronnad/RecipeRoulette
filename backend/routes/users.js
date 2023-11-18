const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios");
const {
  getAllUsers,
  getUserEmail,
  getUserPreferences,
  updateUserPreferences,
} = require("../controllers/UserController");
const { pool } = require("../db/connect");

router.get("/", getAllUsers);
router.post("/getUserEmail", getUserEmail);
router.get("/:userId/preferences", getUserPreferences);
router.post("/:userId/preferences", updateUserPreferences);

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await getUserByEmail(email);
  if (user) {
    return res.status(409).json({ error: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id",
      [fullName, email, hashedPassword]
    );
    res.json({ userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});

function buildPreferenceQueryParams(preferences) {
  let queryParams = "";

  if (preferences.diet) {
    queryParams += `&diet=${preferences.diet}`;
  }
  if (preferences.intolerances) {
    queryParams += `&intolerances=${preferences.intolerances.join(",")}`;
  }

  return queryParams;
}

router.get("/:userId/search", async (req, res) => {
  const userId = req.params.userId;
  console.log("user id from backend for preference", userId);
  const query = req.query.query;
  const apiKey = process.env.APIKEY;

  try {
    const preferences = await getUserPreferences(userId);

    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    const preferenceParams = buildPreferenceQueryParams(preferences);
    url += preferenceParams;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
