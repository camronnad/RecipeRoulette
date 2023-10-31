const { pool } = require("../db/connect");

const queryRatingLikedRecipes = async (rating, userId, id) => {
  console.log('queryRatingLikedRecipes function called'); // Add this line for debugging purposes
  console.log("Received rating for user:", userId);
  console.log("received id:", id);
  console.log("received rating:", rating);

  const queryString = `UPDATE likedRecipes SET rating = $1 WHERE user_id = $2 AND id = $3 `;
  const values = [rating, userId, id];

  try {
    console.log("Before updating the rating");
    const result = await pool.query(queryString, values);
    if (result.rowCount > 0) {
      console.log("Rating updated successfully");
    } else {
      console.log("No rows were updated. Rating may not exist for the provided user and recipe.");
    }
    return result.rows;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};


module.exports = { queryRatingLikedRecipes };