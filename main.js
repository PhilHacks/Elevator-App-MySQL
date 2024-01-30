import express from "express";
import pool from "./dbConnect.js";
import routes from "./routes.js";

export const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // Attempt to get a database connection
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();

    // Start the server
    app.use(routes);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: " + error.message);
    // Handle error or exit process
    process.exit(1);
  }
}

startServer();
