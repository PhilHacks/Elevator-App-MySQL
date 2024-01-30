import pool from "./dbConnect.js";
import fs from "fs/promises";

async function initializeDatabase() {
  try {
    // Read SQL file
    const sql = await fs.readFile("./createdb.sql", "utf8");
    // Split SQL file into individual queries
    const statements = sql.split(/;\s*$/m);

    for (const statement of statements) {
      if (statement.trim()) {
        // Execute each SQL statement
        await pool.query(statement);
      }
    }

    console.log("Database has been initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initializeDatabase();
