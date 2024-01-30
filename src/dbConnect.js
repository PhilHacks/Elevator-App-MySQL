import mysql from "mysql2/promise";
import dotenv from "dotenv"; //.env for security
dotenv.config();

// Initializes a MySQL database connection pool.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "sql_elevators",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
