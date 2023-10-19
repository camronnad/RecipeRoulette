const {pool} = require("../db/connect")

const queryAllUsers = async () => {
  const queryString = `SELECT * FROM users;`;
  const result = await pool.query(queryString)
  // console.log(result)
  return result.rows
}

const getUserEmailModel = async (email) => {
const queryString = `SELECT * FROM users WHERE email = $1;`
const result = await pool.query(queryString, )

}

module.exports = {queryAllUsers}