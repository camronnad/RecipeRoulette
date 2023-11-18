const { pool } = require("../db/connect");


const queryDeleteLikedRecipes = async (resourceId) => {
  console.log('queryDeleteLikedRecipes function called');
  console.log("Received recipe ID for deletion:", resourceId);


  const queryString = "DELETE FROM likedrecipes WHERE id = $1";
  const values = [resourceId];

  try {
    const result = await pool.query(queryString, values);
    if (result.rowCount > 0) {
      console.log("Recipe deleted successfully. Rows affected:", result.rowCount);
      return true;
    } else {
      console.log("Recipe not found.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
module.exports = { queryDeleteLikedRecipes };
