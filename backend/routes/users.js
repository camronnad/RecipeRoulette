const express = require("express");
const router = express.Router();
const { getAllUsers, getUserEmail } = require("../controllers/UserController");
const { pool } = require("../db/connect");

router.get('/', getAllUsers);
router.post('/getUserEmail', getUserEmail); 



router.post('/signup', async(req, res) => {
  const {fullName, email, password} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
    [fullName, email, password]
      );
      res.json({userId: result.rows[0].id })
  } catch(error){
    res.status(500).json({ error:error.message });
  }
});



module.exports = router;


