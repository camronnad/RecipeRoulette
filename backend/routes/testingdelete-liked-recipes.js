// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const { pool } = require("../db/connect");
// const { queryDeleteLikedRecipes } = require("../models/deleteLikedRecipesModel.js");


// //   queryDeleteAllLikedRecipes(recipeId)
// //     .then(likedRecipes => {
// //       console.log("query all liked recipes:", likedRecipes);
// //       const updatedLikedRecipeData = likedRecipeData.filter(recipe => recipe.id !== recipeId);
// //       setLikedRecipeData(updatedLikedRecipeData);
// //     })
// //     .catch(error => {
// //       console.error("Error querying users:", error);
// //       res.status(500).json({ error: "An error occurred while querying users" });
// //     });
// //   res.send(`Deleted resource with ID ${resourceId}`);
// // });
// const deleteLikedRecipeRouter = (pool) => {

//   router.delete('/:id', async (req, res) => {
//     const recipeId = req.params.id;
//     try {
//       // Call the function to delete the liked recipe and wait for it to complete
//       const deletedRecipe = await queryDeleteLikedRecipes(pool, recipeId);

//       if (deletedRecipe) {
//         // The recipe was successfully deleted, you can return a success status
//         res.status(204).send();
//       } else {
//         // Recipe not found
//         res.status(404).json({ error: "Recipe not found" });
//       }
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//     return router;
//   });
// };


// module.exports = { deleteLikedRecipeRouter, router };
