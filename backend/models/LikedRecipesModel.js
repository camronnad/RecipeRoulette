const { pool } = require("../db/connect");

const queryAllLikedRecipes = async (userId) => {
  const queryString = `SELECT * FROM likedRecipes WHERE user_id = $1;`;
  const result = await pool.query(queryString, [userId]);
  return result.rows;
};



module.exports = { queryAllLikedRecipes };