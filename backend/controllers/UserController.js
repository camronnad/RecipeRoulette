const { pool } = require("../db/connect");
const { queryAllUsers, getUserEmailModel } = require("../models/UserModel");

// const { queryAllUsers, getUserByEmail, getUserPreferences, setUserPreferences } = require("../models/UserModel");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await queryAllUsers();
    res.json(allUsers);  // Sending the array of users as a response
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserEmail = async (req, res) => {
  const { email } = req.body; 

  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);  
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Add a new controller function to get user preferences
// This function retrieves user preferences from the database
async function getUserPreferences(req, res) {
  const userId = req.params.userId;
  console.log("userId", userId)
  try {
    const result = await pool.query('SELECT preferences FROM users WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0].preferences);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching preferences" });
  }
}

const checkUserExists = async (userId) => {
  const result = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)', [userId]);
  return result.rows[0].exists;
};

// This function updates user preferences in the database
async function updateUserPreferences(req, res) {
  const userId = req.params.userId;
  const { preferences } = req.body;

  // Check if the user exists before updating
  const userExists = await checkUserExists(userId);
  if (!userExists) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    console.log("preferences", preferences)
    console.log("userId", userId)
    await pool.query('UPDATE users SET preferences = $1 WHERE id = $2', [preferences, userId]);
    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating preferences" });
  }
}

module.exports = { 
  getAllUsers, 
  getUserEmail,
  getUserPreferences,
  updateUserPreferences, 
};
