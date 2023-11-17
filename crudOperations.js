//choose another name

//implement all crud operations in elevator
import { ElevatorModel } from "./elevatorModel.js";

export async function createElevatorsInDB() {
  const elevator1 = new ElevatorModel({
    elevatorId: "Elevator 1",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: 0,
    callQueue: [],
  });
  const elevator2 = new ElevatorModel({
    elevatorId: "Elevator 2",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: 0,
    callQueue: [],
  });
  const elevator3 = new ElevatorModel({
    elevatorId: "Elevator 3",
    currentFloor: 0,
    currentStatus: "idle",
    destinationFloor: 0,
    callQueue: [],
  });

  const result1 = await elevator1.save();
  const result2 = await elevator2.save();
  const result3 = await elevator3.save();

  console.log(result1, result2, result3);
}

export async function getElevatorsFromDB() {
  const elevators = await ElevatorModel.find({});
  console.log(elevators);
}

export async function updateElevatorDB(
  elevatorId,
  currentFloor,
  currentStatus,
  destinationFloor,
  callQueue
) {
  const filter = { elevatorId: elevatorId };

  const update = {
    $set: {
      elevatorId,
      currentFloor,
      currentStatus,
      destinationFloor,
      // callQueue,
    },
  };

  await ElevatorModel.findOneAndUpdate(filter, { ...update });
}
