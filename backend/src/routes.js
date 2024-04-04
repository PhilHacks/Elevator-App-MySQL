import express from "express";
import cors from "cors";
import { Router } from "express";
import ElevatorManager from "./elevatorManager.js";
import {
  isElevatorAvailable,
  getElevatorStatus,
  getCallQueueTable,
} from "./crudOperations.js";

const elevatorManager = new ElevatorManager();
const router = Router();
router.use(cors());

router.use(express.json()); // Middleware to read JSON-data from POST req

router.post("/callElevator", async (req, res) => {
  const floor = req.body.floor;

  if (typeof floor === "undefined" || floor === null) {
    res.status(400).json({ message: "Floor parameter missing." });
    return;
  }
  try {
    await elevatorManager.handleElevatorCalls(floor);

    res.status(200).send(`Calling elevator to floor ${floor}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/elevator/status", async (req, res) => {
  try {
    const elevatorStatus = await getElevatorStatus();
    res.status(200).json(elevatorStatus);
  } catch (error) {
    console.error("Failed to fetch elevator status:", error);
    res.status(500).json({
      message: "Internal Server Error: " + error.message,
    });
  }
});

router.get("/callqueue/table", async (req, res) => {
  try {
    const callQueueTable = await getCallQueueTable();
    res.json(callQueueTable);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
});

//Check if specific elevator is available
router.get("/elevator/available/:elevatorId", async (req, res) => {
  try {
    const elevatorId = req.params.elevatorId;

    if (isNaN(elevatorId)) {
      res.status(400).json({ message: "Invalid elevatorId." });
      return;
    }

    const isAvailable = await isElevatorAvailable(elevatorId);

    if (isAvailable) {
      res.send(`Elevator with ID ${elevatorId} is available.`);
    } else {
      res.send(`Elevator with ID ${elevatorId} is not available.`);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error:" });
  }
});

export { router as app, elevatorManager };
export default router;
