import Elevator from "./elevator.js";

class ElevatorManager {
  constructor() {
    this.numberOfElevators = 3;
    this.numberOfFloors = 10;
    this.elevatorArr = this.createElevatorsArray();
    this.callQueueArr = [];
    this.checkQueueInterval = setInterval(() => this.processQueue(), 2000); // Check every 2 seconds
  }

  createElevatorsArray() {
    const elevators = [];
    for (
      let elevatorId = 1;
      elevatorId <= this.numberOfElevators;
      elevatorId++
    ) {
      const elevator = new Elevator(elevatorId);
      elevators.push(elevator);
    }
    return elevators;
  }

  findClosestElevator(destinationFloor) {
    try {
      const idleElevators = this.findIdleElevators();
      const sortedElevators = this.sortIdleElevatorsByDistance(
        idleElevators,
        destinationFloor
      );
      return this.getFirstIdleElevator(sortedElevators) || null;
    } catch (error) {
      console.error("An error occured in findClosestElevator:", error.message);
    }
  }

  findIdleElevators() {
    return this.elevatorArr.filter((elevator) => !elevator.isMoving);
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
      this.checkIfElevatorOnFloor(destinationFloor);

      this.callOrQueueElevator(destinationFloor);
    } catch (error) {
      console.error("An error occureprocess:", error.message);
    }
  }

  checkInvalidFloorReq(destinationFloor) {
    if (destinationFloor < 1 || destinationFloor > this.numberOfFloors) {
      throw new Error("Invalid floor requested.");
    }
  }

  checkIfElevatorOnFloor(destinationFloor) {
    const elevatorOnFloor = this.elevatorArr.find(
      (elevator) =>
        elevator.currentFloor === destinationFloor && !elevator.isMoving
    );
    if (elevatorOnFloor) {
      console.log(`Elevator already at floor ${destinationFloor}`);
      return;
    }
  }

  callOrQueueElevator(destinationFloor) {
    const idleElevator = this.findClosestElevator(destinationFloor);
    if (idleElevator) {
      idleElevator.moveToFloor(destinationFloor);
      console.log(
        `Elevator ${idleElevator.elevatorId} has moved to ${destinationFloor}.`
      );
    } else {
      this.queueElevatorCall(destinationFloor);
    }
  }

  queueElevatorCall(destinationFloor) {
    this.callQueueArr.push(destinationFloor);
    console.log(`Call added to queue for floor ${destinationFloor}.`);
  }

  processQueue() {
    if (this.callQueueArr.length === 0) {
      return;
    }

    const idleElevator = this.findClosestElevator(this.callQueueArr[0]);
    if (idleElevator) {
      const oldestCall = this.removeCallFromQueue();
      idleElevator.moveToFloor(oldestCall).then(() => {
        console.log(
          `Elevator ${idleElevator.elevatorId} has moved to ${oldestCall} from queue.`
        );
      });
    }
  }

  removeCallFromQueue() {
    if (this.callQueueArr.length > 0) {
      return this.callQueueArr.shift();
    }
    return null;
  }

  isElevatorAvailable(elevatorId) {
    const elevator = this.elevatorArr[elevatorId - 1]; // Justera id så matchar m array-index
    return elevator && !elevator.isMoving;
  }

  getElevatorStatus() {
    return this.elevatorArr.map((elevator) => ({
      elevatorId: elevator.elevatorId,
      currentFloor: elevator.currentFloor,
      isMoving: elevator.isMoving,
      currentStatus: elevator.currentStatus,
    }));
  }
}

export default ElevatorManager;
