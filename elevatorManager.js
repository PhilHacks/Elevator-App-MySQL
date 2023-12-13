// import Elevator from "./elevator.js";
import { ElevatorModel } from "./elevatorModel.js";
import { updateElevatorDB } from "./crudOperations.js";

class ElevatorManager {
  constructor() {
    this.numberOfFloors = 10;
    this.floorTravelTimeMs = 2000;
    this.checkQueueInterval = setInterval(() => this.processQueue(), 500); // Check every 0.5 seconds
  }

  async findIdleElevators() {
    return await ElevatorModel.find({ currentStatus: "idle" });
  }

  async findClosestElevator(destinationFloor) {
    try {
      const idleElevators = await this.findIdleElevators();
      const sortedElevators = this.sortIdleElevatorsByDistance(
        idleElevators,
        destinationFloor
      );
      return this.getFirstIdleElevator(sortedElevators) || null;
    } catch (error) {
      console.error("An error occured in findClosestElevator:", error.message);
    }
  }

  sortIdleElevatorsByDistance(elevators, destinationFloor) {
    return elevators.sort(
      (a, b) =>
        Math.abs(a.currentFloor - destinationFloor) -
        Math.abs(b.currentFloor - destinationFloor)
    );
  }

  getFirstIdleElevator(sortedElevators) {
    return sortedElevators[0];
  }

  async handleElevatorCalls(destinationFloor) {
    try {
      this.checkInvalidFloorReq(destinationFloor);
      const elevatorOnFloor = await this.checkIfElevatorOnFloor(
        destinationFloor
      );

      if (!elevatorOnFloor) {
        this.callOrQueueElevator(destinationFloor);
      }
    } catch (error) {
      console.error("An error occured in handleElevatorCalls:", error.message);
    }
  }

  checkInvalidFloorReq(destinationFloor) {
    if (destinationFloor < 1 || destinationFloor > this.numberOfFloors) {
      throw new Error("Invalid floor requested.");
    }
  }

  async checkIfElevatorOnFloor(destinationFloor) {
    const elevatorOnFloor = await ElevatorModel.findOne({
      currentFloor: destinationFloor,
      currentStatus: "idle",
    });
    if (elevatorOnFloor) {
      console.log(`Elevator already at floor ${destinationFloor}`);
      return true;
    }
    return false;
  }

  async callOrQueueElevator(destinationFloor) {
    const idleElevator = await this.findClosestElevator(destinationFloor);
    if (idleElevator) {
      const newStatus =
        destinationFloor > idleElevator.currentFloor
          ? "moving_up"
          : "moving_down";

      await updateElevatorDB(
        idleElevator.elevatorId,
        newStatus,
        idleElevator.currentFloor
      );

      await this.moveToFloor(idleElevator.elevatorId, destinationFloor);
    } else {
      this.queueElevatorCall(destinationFloor);
    }
  }

  async queueElevatorCall(destinationFloor) {
    await ElevatorModel.updateMany(
      {},
      { $push: { callQueue: destinationFloor } }
    );
    console.log(`Call added to queue for floor ${destinationFloor}.`);
  }

  async processQueue() {
    const elevators = await ElevatorModel.find();

    const queuedCalls = [
      ...new Set(elevators.flatMap((elevator) => elevator.callQueue)),
    ].sort();

    // Process each call concurrently
    await Promise.all(
      queuedCalls.map(async (call) => {
        // Check if any elevator is already at or heading to the oldest call floor
        const elevatorAlreadyThere = elevators.find(
          (elevator) =>
            elevator.currentFloor === call || elevator.destinationFloor === call
        );

        if (!elevatorAlreadyThere) {
          const idleElevator = await this.findClosestElevator(call);
          if (idleElevator) {
            await this.moveToFloor(idleElevator.elevatorId, call);

            // Remove the call from the queue of all elevators
            await ElevatorModel.updateMany({}, { $pull: { callQueue: call } });
          }
        }
      })
    );
  }

  async moveToFloor(elevatorId, destinationFloor) {
    try {
      const elevator = await ElevatorModel.findOne({ elevatorId: elevatorId });

      if (!elevator) {
        throw new Error(`Elevator with ID ${elevatorId} not found.`);
      }

      if (elevator.currentFloor === destinationFloor) {
        console.log(
          `Elevator ${elevatorId} is already at floor ${destinationFloor}`
        );
        return; // Exit if the elevator is already at the destination floor
      }

      this.calculateTravelTime(elevator, destinationFloor);
      await this.setToMovingState(elevator, destinationFloor);
      await this.simulateTravelTime(elevator, destinationFloor);

      await updateElevatorDB(
        elevator.elevatorId,
        "idle",
        destinationFloor,
        null
      );
    } catch (error) {
      console.error("An error occurred in moveToFloor:", error.message);
      throw error;
    }
  }

  async getElevatorStatus() {
    return this.elevatorArr.map((elevator) => ({
      elevatorId: elevator.elevatorId,
      currentFloor: elevator.currentFloor,
      isMoving: elevator.isMoving,
      currentStatus: elevator.currentStatus,
    }));
  }

  async isElevatorAvailable(elevatorId) {
    const elevator = this.elevatorArr[elevatorId - 1]; // Justera id så matchar m array-index
    return elevator && !elevator.isMoving;
  }

  async setToMovingState(elevator, destinationFloor) {
    const newStatus =
      destinationFloor > elevator.currentFloor ? "moving_Up" : "moving_Down";
    await updateElevatorDB(
      elevator.elevatorId,
      newStatus,
      elevator.currentFloor,
      destinationFloor
    );
    console.log(
      `Elevator ${elevator.elevatorId} is moving from floor ${elevator.currentFloor} to floor ${destinationFloor}`
    );
  }

  calculateTravelTime(elevator, destinationFloor) {
    if (isNaN(destinationFloor) || destinationFloor < 1) {
      throw new Error("Invalid destination floor.");
    }
    elevator.floorTravelTimeMs =
      Math.abs(destinationFloor - elevator.currentFloor) *
      this.floorTravelTimeMs;
  }
  async simulateTravelTime(elevator, destinationFloor) {
    const startFloor = elevator.currentFloor;
    const endFloor = destinationFloor;
    const travelDirection = startFloor < endFloor ? 1 : -1; // 1 for up, -1 for down
    const totalFloorsToTravel = Math.abs(endFloor - startFloor);

    for (let i = 1; i <= totalFloorsToTravel; i++) {
      // Calculate the next floor
      const nextFloor = startFloor + travelDirection * i;

      // Wait for the time it takes to reach the next floor
      await new Promise((resolve) =>
        setTimeout(resolve, this.floorTravelTimeMs)
      );

      // Update the elevator's current floor in the database
      await updateElevatorDB(
        elevator.elevatorId,
        elevator.currentStatus,
        nextFloor
      );
    }

    // Update the elevator's status to "idle" after reaching the destination
    await updateElevatorDB(elevator.elevatorId, "idle", destinationFloor);
    console.log(
      `Elevator ${elevator.elevatorId} has arrived to floor ${destinationFloor}`
    );
  }
}

export default ElevatorManager;
