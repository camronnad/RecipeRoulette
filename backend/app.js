require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const pool = require('./db/connect');  
const userRouter = require("./routes/users");
const { searchRouter } = require("./routes/search");

const app = express();

// Middleware for request logging
app.use(morgan('combined'));

// Middleware to parse JSON bodies
app.use(express.json());

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

// Function to start server and connect to the database
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
