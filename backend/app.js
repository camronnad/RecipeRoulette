require("dotenv").config();
const express = require("express");
const app = express();

const { connectDB, pool } = require("./db/connect");

// routes 
const userRouter = require("./routes/users");
const { searchRouter } = require("./routes/search");

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/users", userRouter);
app.use("/api/search", searchRouter());



const startApp = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, console.log(`App started on PORT ${process.env.PORT}`));
  } catch (err) {
    console.log("an error occured", err);
  }
};

startApp();