const { pool } = require("../db/connect");

const queryAllLikedRecipes = async () => {
  const queryString = `SELECT * FROM likedrecipes;`;
  const result = await pool.query(queryString);
  // console.log(result)
  return result.rows;
};


module.exports = { queryAllLikedRecipes };