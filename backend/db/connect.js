require("dotenv").config();
const { Pool } = require("pg");

const { USER, PASSWORD, HOST, DATABASE } = process.env;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  database: DATABASE,
});
const connectDB = () => {
  return pool
    .connect()
    .then(() =>
      console.log(`The application is connected to ${DATABASE} database`)
    )
    .catch((err) => console.error("connection error", err));

  // return pool
};



module.exports = { connectDB, pool };
