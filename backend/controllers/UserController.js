const { pool } = require("../db/connect");
const { queryAllUsers, getUserEmailModel } = require("../models/UserModel");

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

module.exports = { 
  getAllUsers, 
  getUserEmail 
};
