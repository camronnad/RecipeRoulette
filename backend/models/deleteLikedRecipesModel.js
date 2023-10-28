const { pool } = require("../db/connect");

// const queryDeleteLikedRecipes = async (resourceId) => {
//   // const queryString = `DELETE FROM likedrecipes WHERE id = ${resourceId};`;
//   const queryString = "DELETE FROM likedrecipes WHERE id = $1";
//   const values = [resourceId];
//   //const result = await pool.query(queryString);
//   try {

//     const result = await pool.query(queryString, values);
//     // console.log(result)
//     //   return result.rows;
//     // };
//     return result.rowCount > 0; // Returns true if a row was deleted
//   } catch (error) {
//     console.error("Error deleting recipe:", error);
//     throw error;
//   }
// };
const queryDeleteLikedRecipes = async (resourceId) => {
  console.log('queryDeleteLikedRecipes function called'); // Add this line
  console.log("Received recipe ID for deletion:", resourceId); // Add this line


  const queryString = "DELETE FROM likedrecipes WHERE id = $1";
  const values = [resourceId];

  try {
    const result = await pool.query(queryString, values);
    if (result.rowCount > 0) {
      console.log("Recipe deleted successfully. Rows affected:", result.rowCount);
      return true; // Returns true if a row was deleted
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
