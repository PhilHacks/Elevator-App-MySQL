//implement all crud operations in elevator
import { ElevatorModel } from "./elevatorModel.js";

export async function createElevatorsInDB() {
  const numberOfElevators = 3;
  const elevators = [];

  for (let i = 1; i <= numberOfElevators; i++) {
    elevators.push({
      elevatorId: `${i}`,
      currentFloor: 0,
      currentStatus: "idle",
      destinationFloor: null,
      callQueue: [],
    });
  }

  try {
    const results = await ElevatorModel.insertMany(elevators);
    console.log(results);
  } catch (error) {
    console.error("Error creating elevators in DB:", error);
  }
}

export async function callElevatorToFloor(elevatorId, floor) {
  const filter = { elevatorId };
  const update = { destinationFloor: floor };
  await ElevatorModel.findByIdAndUpdate(filter, update);
}

export async function updateElevatorFloorOnly(elevatorId, currentFloor) {
  const filter = { elevatorId };
  const update = { $set: { currentFloor } };
  await ElevatorModel.findOneAndUpdate(filter, update);
}

export async function updateElevatorDB(
  elevatorId,
  currentStatus,
  currentFloor,
  destinationFloor
) {
  const filter = { elevatorId };
  const update = { $set: { currentStatus, currentFloor, destinationFloor } };
  await ElevatorModel.findOneAndUpdate(filter, update);
}

export async function getElevatorStatus() {
  const elevatorStatus = await ElevatorModel.find(
    {},
    "elevatorId currentFloor currentStatus destinationFloor"
  );
  return elevatorStatus;
}

export async function isElevatorAvailable(elevatorId) {
  const elevator = await ElevatorModel.findOne({ elevatorId });
  return elevator && elevator.currentStatus === "idle";
}
