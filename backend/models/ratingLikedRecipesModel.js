const { pool } = require("../db/connect");

const queryRatingLikedRecipes = async (rating, userId, recipeId) => {
  console.log('queryRatingLikedRecipes function called'); // Add this line for debugging purposes
  console.log("Received recipe ID for rating:", recipeId);

  const queryString = `UPDATE likedrecipes SET rating = $1 WHERE user_id = $2 AND recipe_id = $3 `;
  const values = [rating, userId, recipeId];

  try {
    const result = await pool.query(queryString, values);
    return result.rows;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};


module.exports = { queryRatingLikedRecipes };