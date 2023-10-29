const { Pool } = require('pg');
require('dotenv').config();

// Check if environment variables are loaded
console.log('Database Name:', process.env.PGDATABASE);

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connection established');
  // further code for queries or routing
});

module.exports = pool;
