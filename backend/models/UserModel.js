const {pool} = require("../db/connect")

const queryAllUsers = async (req, res) => {
  const queryString = `SELECT * FROM users;`;
  const result = await pool.query(queryString)
  // console.log(result)
  return result.rows
}

module.exports = {queryAllUsers}