import express from "express";
import cors from "cors";
import { Router } from "express";
import ElevatorManager from "./elevatorManager.js";
import {
  isElevatorAvailable,
  getElevatorStatus,
  getCallQueueTable,
  updateElevatorDB,
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
    const message = await elevatorManager.handleElevatorCalls(floor);
    res.json({ message: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/elevator/status", async (req, res) => {
  try {
    const elevators = await getElevatorStatus();

    const formattedData = {
      elevators: elevators.map((elevator, index) => ({
        elevator_id: index + 1,
        current_floor: elevator.current_floor,
        current_status: elevator.current_status,
        destination_floor: elevator.destination_floor,
      })),
    };
    res.status(200).json(formattedData);
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

router.put("/updateElevatorStatus", async (req, res) => {
  const { id, status, currentFloor } = req.body;
  try {
    let currentStatus = status;
    let destinationFloor = null;
    let currentFloorToUpdate = currentFloor;

    if (status === "out_of_service") {
      currentStatus = status;
      // Set currentFloorToUpdate to null if currentFloor is undefined
      if (typeof currentFloor === "undefined") {
        currentFloorToUpdate = null;
      }
    } else if (status === "idle") {
      currentStatus = status;
      // Set the current floor to the destination floor
      destinationFloor = null;
    }

    await updateElevatorDB(
      id,
      currentStatus,
      currentFloorToUpdate,
      destinationFloor
    );
    console.log("Elevator status updated successfully");

    res.status(200).json({
      message: `Elevator status updated successfully for elevator ${id}.`,
    });
  } catch (error) {
    console.error("Failed to update elevator status:", error);
    res.status(500).json({
      message: "Failed to update elevator status. Please try again later.",
    });
  }
});

// Route to fetch the call queue data
router.get("/callqueue", async (req, res) => {
  try {
    // Call the function to fetch the call queue data from the database
    const callQueueData = await getCallQueueTable();

    // Send the fetched call queue data as the response
    res.status(200).json(callQueueData);
  } catch (error) {
    console.error("Failed to fetch call queue data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as app, elevatorManager };
export default router;
