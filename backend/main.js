import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import pool from "./src/dbConnect.js";
import createRoutes from "./src/routes.js";

export const app = express();
const port = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export { io };

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();

    const routes = createRoutes(io);
    app.use(routes);
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: " + error.message);
    console.error("- Message:", error.message);
    console.error("- Stack:", error.stack);
    process.exit(1);
  }
}

startServer();
