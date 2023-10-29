require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const { connectDB } = require("./db/connect");

// routes 
const userRouter = require("./routes/users");
const { searchRouter } = require("./routes/search");
const likesRouter = require('./routes/likedRecipes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/users", userRouter);
app.use("/api/search", searchRouter());
app.use("/api/saveLikeRecipe", likesRouter)


const startApp = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, console.log(`App started on PORT ${process.env.PORT}`));
  } catch (err) {
    console.log("an error occured", err);
  }
};

startApp();