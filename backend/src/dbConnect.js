import mysql from "mysql2/promise";
import dotenv from "dotenv"; //.env for security
dotenv.config();

// Initializes a MySQL database connection pool.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Filipgoeswild90",
  database: "sql_elevators",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
