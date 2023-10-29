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

module.exports = {
  queryAllUsers,
  getUserByEmail
};
