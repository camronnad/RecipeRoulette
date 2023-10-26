const { pool } = require("../db/connect");
const { queryAllLikedRecipes } = require("../models/LikedRecipesModel");

const getAllLikedRecipes = async (req, res) => {
  // const queryString = `SELECT * FROM users;`;
  // pool.query(queryString).then((resp) => {
  //   console.log("response is ", resp.rows);
  //   return resp.rows;
  // });

  const allLikedRecipes = await queryAllLikedRecipes();
  return res.json({ allLikedRecipes });
};



module.exports = { getAllLikedRecipes };
