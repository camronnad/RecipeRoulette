const { pool } = require("../db/connect");
const {queryAllUsers, getUserEmailModel } = require("../models/UserModel")

const getAllUsers = async (req, res) => {
  // const queryString = `SELECT * FROM users;`;
  // pool.query(queryString).then((resp) => {
  //   console.log("response is ", resp.rows);
  //   return resp.rows;
  // });

  const allUsers = await queryAllUsers()
   return res.json({allUsers})
};

const getUserEmail = async (req, res) => {
  const {email} = req.body
  const userEmail = await getUserEmailModel(email)
}

module.exports = { getAllUsers };
