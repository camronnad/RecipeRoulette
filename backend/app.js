require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const { connectDB } = require("./db/connect");

// routes 
const userRouter = require("./routes/users");
const { searchRouter } = require("./routes/search");
const likesRouter = require('./routes/likedRecipes');
const { likedRecipeRouter } = require("./routes/liked-recipes");


const app = express();

// Middleware for request logging
app.use(morgan('combined'));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));//Signup Route
app.post('/api/v1/users/signup', async(req, res) => {
  const {fullName, email, password} =req.body;
  try{
    const result =await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
    [fullName, email, password]
      );
      res.json({userId: result.rows[0].id })
  } catch(error){
    res.status(500).json({ error:error.message });
  }
});

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/search", searchRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/users", userRouter);
app.use("/api/search", searchRouter());
app.use("/api/saveLikeRecipe", likesRouter);
app.use("/api/liked-recipes", likedRecipeRouter());


const startApp = async () => {
  try {
    // Try to connect to the database
    await pool.connect();
    console.log(`Connected to database: ${process.env.PGDATABASE}`);

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
