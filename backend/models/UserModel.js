const bcrypt = require('bcrypt');
const { pool } = require("../db/connect");


const queryAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;  // This will be the array of users
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];  // Assuming email is unique and only one record should match
  } catch (error) {
    throw new Error(error);
  }
};

async function authenticate(email, password) {
  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      console.log(bcrypt);
      // Compare the provided password with the hashed password in the database
      console.log(password)
      console.log(user.password)
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        return user; // Passwords match, return the user
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('User not found, please sign up');
    }
  } catch (error) {
    throw error; // Or handle the error as you see fit
  }
}
module.exports = {
  queryAllUsers,
  getUserByEmail,
  authenticate 
};  