const express = require("express");
const router = express.Router();
const { getAllUsers, getUserEmail } = require("../controllers/UserController");

router.get('/', getAllUsers);
router.post('/getUserEmail', getUserEmail); 
module.exports = router;
