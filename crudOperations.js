//choose another name

//implement all crud operations in elevator

export async function createElevators() {
  const elevator1 = new ElevatorModel({
    elevatorId: "Elevator 1",
    currentFloor: 0,
    status: "idle",
    destinationFloor: 0,
  });
  const elevator2 = new ElevatorModel({
    elevatorId: "Elevator 2",
    currentFloor: 0,
    status: "idle",
    destinationFloor: 0,
  });
  const elevator3 = new ElevatorModel({
    elevatorId: "Elevator 3",
    currentFloor: 0,
    status: "idle",
    destinationFloor: 0,
  });

  const result1 = await elevator1.save();
  const result2 = await elevator2.save();
  const result3 = await elevator3.save();

  console.log(result1, result2, result3);
}

export async function getElevators() {
  const elevators = await ElevatorModel.find({});
  console.log(elevators);
}
