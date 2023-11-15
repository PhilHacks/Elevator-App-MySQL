import express from "express";
import { dbConnection } from "./dbConnect.js";
import { createElevators } from "./elevatorModel.js";

export const app = express();

try {
  const port = process.env.PORT || 3000;

  //make sure connetion to db before server starts
  dbConnection.then(() => {
    createElevators();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
} catch (error) {
  console.error(
    "An error occurred during server initialization:",
    error.message
  );
}
