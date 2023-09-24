const express = require("express");
const ElevatorSystem = require("./elevatorManager");

const elevatorSystem = new ElevatorSystem();
const app = express();

app.use(express.json()); // Middleware för att kunna läsa JSON-data från POST requests.

// Route för att kalla på hiss
app.post("/callElevator", async (req, res) => {
  const floor = req.body.floor;

  if (typeof floor === "undefined" || floor === null) {
    res.status(400).send("Bad Request: floor parameter missing.");
    return;
  }
  try {
    await elevatorSystem.handleCalls(floor);
    res.send(`Calling elevator to floor ${floor}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route för att hämta statusen för alla hissar
app.get("/elevator/status", (req, res) => {
  const elevatorStatus = elevatorSystem.getElevatorStatus();
  res.json(elevatorStatus);
});

// Route för att kontrollera om en specifik hiss är tillgänglig
app.get("/elevator/available/:elevatorId", (req, res) => {
  const elevatorId = parseInt(req.params.elevatorId);

  if (isNaN(elevatorId)) {
    res.status(400).send("Invalid elevatorId.");
    return;
  }

  const isAvailable = elevatorSystem.isElevatorAvailable(elevatorId);

  if (isAvailable) {
    res.send(`Elevator with ID ${elevatorId} is available.`);
  } else {
    res.send(`Elevator with ID ${elevatorId} is not available.`);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, elevatorSystem };
