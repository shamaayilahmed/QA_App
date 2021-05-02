const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();  // CONFIGURES ENVIRONMENT VARIABLE

const server = express();
server.use(cors());
server.use(express.json());  // PARSES RESPONSE IN JSON FORMAT

// CONFIGURES DB WITH ENVIRONMENT VARIABLES
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// SETS THE SERVER TO ACCEPT REQUESTS
const listener = server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening to port ' + listener.address().port)
})

// 1. GETS DATA FROM CONFIGURED DB
// 2. A REQUEST TO localhost:3000/qa GETS ALL DATA FROM THE CONFIGURED DB
server.get("/qa", (request, response) => {
  db.query("SELECT * FROM qatable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
    }
  });
});
