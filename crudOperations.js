//implement all crud operations in elevator
import { ElevatorModel } from "./elevatorModel.js";

export async function createElevatorsInDB() {
  const elevator1 = new ElevatorModel({
    elevatorId: "Elevator 1",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: null,
    callQueue: [],
  });
  const elevator2 = new ElevatorModel({
    elevatorId: "Elevator 2",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: null,
    callQueue: [],
  });
  const elevator3 = new ElevatorModel({
    elevatorId: "Elevator 3",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: null,
    callQueue: [],
  });

  const result1 = await elevator1.save();
  const result2 = await elevator2.save();
  const result3 = await elevator3.save();

  console.log(result1, result2, result3);
}

export async function callElevatorToFloor(elevatorId, floor) {
  const filter = { elevatorId };
  const update = { destinationFloor: floor };
  await ElevatorModel.findByIdAndUpdate(filter, update);
}

export async function getElevatorStatus() {
  const elevatorStatus = await ElevatorModel.find(
    {},
    "elevatorId currentFloor currentStatus destinationFloor"
  );
  console.log(elevatorStatus);
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

export async function isElevatorAvailable(elevatorId) {
  const elevator = await ElevatorModel.findOne({ elevatorId });
  return elevator && elevator.currentStatus === "idle";
}