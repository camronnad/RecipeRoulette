const express = require("express")
const router = express.Router()

const {getAllUsers} = require("../controllers/UserController")

// const {pool} = require

// const userRouter = (pool) => {

//   router.route("/", (req, res) => {
//     const queryString = `SELECT * FROM users;`
//     pool.query(queryString)
//     .then(res => res.rows[0]);
//   })
// }

// module.exports = userRouter
router.route("/").get(getAllUsers)

module.exports = router