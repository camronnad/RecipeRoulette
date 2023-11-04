const { pool } = require("../db/connect");

const queryAllLikedRecipes = async () => {
  const queryString = `SELECT * FROM likedRecipes;`;
  const result = await pool.query(queryString);
  console.log("result:", result)
  return result.rows;
};



module.exports = { queryAllLikedRecipes };