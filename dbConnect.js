import dotenv from "dotenv"; //.env for security
dotenv.config();

import mysql from "mysql2";

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "sql_elevators",
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting: " + error.stack);
    return;
  }
  console.log("Connected to the database");
});

// Close the connection
connection.end();
