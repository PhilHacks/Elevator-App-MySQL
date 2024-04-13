import {
  updateElevatorDB,
  findIdleElevators,
  checkIfElevatorOnFloor,
  queueElevatorCall,
  findOldestQueuedCall,
  isElevatorAtFloor,
  removeCallFromQueue,
  isElevatorHeadingToFloor,
} from "./crudOperations.js";
import pool from "./dbConnect.js";

class ElevatorManager {
  constructor() {
    this.defaultFloor = 1;
    this.numberOfFloors = 10;
    this.floorTravelTimeMs = 6000;
    this.checkQueueInterval = setInterval(() => this.queueManager(), 2000);
  }

  async handleElevatorCalls(destination_floor) {
    try {
      this.validateFloorReq(destination_floor);
      const elevatorOnFloor = await checkIfElevatorOnFloor(destination_floor);

      if (elevatorOnFloor) {
        const message = `Elevator already at floor ${destination_floor}`;
        console.log(message);
        return { message };
      } else {
        return await this.callOrQueueElevator(destination_floor);
      }
    } catch (error) {
      console.error("An error occured in handleElevatorCalls:", error.message);
      throw error;
    }
  }

  validateFloorReq(destination_floor) {
    if (
      destination_floor < this.defaultFloor ||
      destination_floor > this.numberOfFloors
    ) {
      throw new Error("Invalid floor requested.");
    }
  }

  async callOrQueueElevator(destination_floor) {
    try {
      const elevatorHeading = await isElevatorHeadingToFloor(destination_floor);

      const idleElevator = await this.findClosestElevator(destination_floor);
      if (idleElevator && idleElevator.elevator_id) {
        const newStatus =
          destination_floor > idleElevator.current_floor
            ? "moving_up"
            : "moving_down";
        await updateElevatorDB(
          idleElevator.elevator_id,
          newStatus,
          idleElevator.current_floor,
          destination_floor
        );
        return await this.moveToFloor(
          idleElevator.elevator_id,
          destination_floor
        );
      } else {
        console.log(
          `No available elevators; queueing call to floor ${destination_floor}`
        );
        await queueElevatorCall(destination_floor);
        // return { message: `Call to floor ${destination_floor} queued.` };
      }
    } catch (error) {
      console.error("An error occurred in callOrQueueElevator:", error.message);
      throw error;
    }
  }

  async findClosestElevator(destination_floor) {
    try {
      const idleElevators = await findIdleElevators();

      const sortedElevators = this.sortIdleElevatorsByDistance(
        idleElevators,
        destination_floor
      );

      const closestElevator =
        sortedElevators[0] && sortedElevators[0].current_floor !== null
          ? sortedElevators[0]
          : { ...sortedElevators[0], current_floor: null, elevator_id: null };

      return closestElevator;
    } catch (error) {
      console.error("An error occurred in findClosestElevator:", error.message);
    }
  }

  sortIdleElevatorsByDistance(elevators, destination_floor) {
    return elevators.sort(
      (a, b) =>
        Math.abs(a.current_floor - destination_floor) -
        Math.abs(b.current_floor - destination_floor)
    );
  }

  async moveToFloor(elevator_id, destination_floor) {
    try {
      const [result] = await pool.query(
        "SELECT * FROM elevators WHERE elevator_id = ?",
        [elevator_id]
      );
      if (result.length === 0)
        throw new Error(`Elevator with ID ${elevator_id} not found.`);
      const elevator = result[0];

      for (
        let currentFloor = elevator.current_floor;
        Math.abs(currentFloor - destination_floor) > 0;
        currentFloor += destination_floor > currentFloor ? 1 : -1
      ) {
        // Determine status based on direction
        const status =
          currentFloor < destination_floor ? "moving_up" : "moving_down";

        // Update the database for the next floor
        await updateElevatorDB(
          elevator_id,
          status,
          currentFloor,
          destination_floor
        );

        // Wait for the time it takes to reach the next floor
        await new Promise((resolve) =>
          setTimeout(resolve, this.floorTravelTimeMs)
        );
      }

      // Final update to 'idle' once the destination is reached
      await updateElevatorDB(elevator_id, "idle", destination_floor);
      console.log(
        `Elevator ${elevator_id} has arrived at floor ${destination_floor}`
      );

      // Directly return the message object
      return {
        message: `Elevator ${elevator_id} has arrived at floor ${destination_floor}`,
      };
    } catch (error) {
      console.error("MoveToFloor - An error occurred:", error.message);
      throw error;
    }
  }

  async setToMovingState(elevator, destination_floor) {
    const newStatus =
      destination_floor > elevator.current_floor ? "moving_Up" : "moving_Down";
    await updateElevatorDB(
      elevator.elevator_id,
      newStatus,
      elevator.current_floor,
      destination_floor
    );
  }

  calculateTravelTime(elevator, destination_floor) {
    if (isNaN(destination_floor) || destination_floor < 1) {
      throw new Error("Invalid destination floor.");
    }
    elevator.floorTravelTimeMs =
      Math.abs(destination_floor - elevator.current_floor) *
      this.floorTravelTimeMs;
  }

  async queueManager() {
    try {
      const oldestCall = await findOldestQueuedCall();

      if (oldestCall) {
        const elevatorHeading = await isElevatorHeadingToFloor(oldestCall);
        const elevatorAlreadyThere = await isElevatorAtFloor(oldestCall);

        if (!elevatorHeading && !elevatorAlreadyThere) {
          const idleElevator = await this.findClosestElevator(oldestCall);

          if (idleElevator && idleElevator.elevator_id != null) {
            const result = await this.moveToFloor(
              idleElevator.elevator_id,
              oldestCall
            );
            await removeCallFromQueue(oldestCall);
            return result;
          }
        }
      }
    } catch (error) {
      console.error("An error occurred in queueManager:", error.message);
    }
  }
}

export default ElevatorManager;
