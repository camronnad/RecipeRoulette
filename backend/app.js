require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const { connectDB, pool } = require("./db/connect");
const { authenticate } = require('./models/UserModel');

// routes 
const userRouter = require("./routes/users");
const { searchRouter } = require("./routes/search");
const likesRouter = require('./routes/likedRecipes');
const { likedRecipeRouter } = require("./routes/liked-recipes");
const bcrypt = require('bcrypt');
// Middleware for request logging
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));//Signup Route

app.post('/api/v1/users/signup', async(req, res) => {
  const {fullName, email, password} =req.body;
  try{
    const hashedPasword = await bcrypt.hash(password, 10);
    const result =await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
    [fullName, email, hashedPasword]
      );
      res.json({userId: result.rows[0].id })
  } catch(error){
    res.status(500).json({ error:error.message });
  }
});

app.post('/api/v1/users/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email); // Logging the email trying to log in
  console.log('Password received:', password);
  try {
    const user = await authenticate(email, password);
    // If authentication is successful, do something with the user
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error); // Log the error for inspection
    res.status(401).json({ error: error.message });
  }
});

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/search", searchRouter(pool));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

//app.use("/api/v1/users", userRouter);
//app.use("/api/search", searchRouter());
app.use("/api/saveLikeRecipe", likesRouter);
app.use("/api/liked-recipes", likedRecipeRouter());


const startApp = async () => {
  try {
    // Try to connect to the database
    await connectDB();
    console.log(`Connected to database: ${process.env.DB_PORT}`);

    // Specify the port to listen on
    const PORT = process.env.PORT || 5000;

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    // Exiting the process as the server needs the database to function properly
    process.exit(1);
  }
};


startApp();
