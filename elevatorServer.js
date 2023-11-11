import express from "express";
import ElevatorManager from "./elevatorManager.js";

const elevatorManager = new ElevatorManager();
const app = express();

app.use(express.json()); // Middleware to read JSON-data from POST req

app.post("/callElevator", async (req, res) => {
  const floor = req.body.floor;

  if (typeof floor === "undefined" || floor === null) {
    res.status(400).json({ message: "Floor parameter missing." });
    return;
  }
  try {
    await elevatorManager.handleElevatorCalls(floor);
    res.send(`Calling elevator to floor ${floor}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/elevator/status", (req, res) => {
  const elevatorStatus = elevatorManager.getElevatorStatus();
  res.json(elevatorStatus);
});

//Check if specific elevator is available
app.get("/elevator/available/:elevatorId", (req, res) => {
  try {
    const elevatorId = parseInt(req.params.elevatorId);

    if (isNaN(elevatorId)) {
      res.status(400).json({ message: "Invalid elevatorId." });
      return;
    }

    const isAvailable = elevatorManager.isElevatorAvailable(elevatorId);

    if (isAvailable) {
      res.send(`Elevator with ID ${elevatorId} is available.`);
    } else {
      res.send(`Elevator with ID ${elevatorId} is not available.`);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error:" });
  }
});

try {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error(
    "An error occurred during server initialization:",
    error.message
  );
}

export { app, elevatorManager };
