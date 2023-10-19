const { pool } = require("../db/connect");
const {queryAllUsers} = require("../models/UserModel")

const getAllUsers = async (req, res) => {
  // const queryString = `SELECT * FROM users;`;
  // pool.query(queryString).then((resp) => {
  //   console.log("response is ", resp.rows);
  //   return resp.rows;
  // });

  const allUsers = await queryAllUsers()
  res.json({allUsers})
};

module.exports = { getAllUsers };
