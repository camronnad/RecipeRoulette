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
const queryTopLikedRecipes = async () => {
  const queryString = ` SELECT
  users.id AS user_id,
  users.name AS user_name,
  likedRecipes.id AS recipe_id,
  likedRecipes.title AS recipe_title,
  likedRecipes.description AS recipe_description,
  likedRecipes.recipe_link AS recipe_link,
  likedRecipes.summary AS recipe_summary,
  likedRecipes.photo_url AS recipe_photo_url,
  likedRecipes.instructions AS recipe_instructions,
  likedRecipes.readyInMinutes AS recipe_readyInMinutes,
  likedRecipes.rating AS recipe_rating

FROM users
INNER JOIN likedRecipes ON users.id = likedRecipes.user_id
WHERE likedRecipes.rating >= 4
LIMIT 9;`;
  const result = await pool.query(queryString);
  // console.log(result)
  return result.rows;
};


module.exports = { queryRatingLikedRecipes, queryTopLikedRecipes };