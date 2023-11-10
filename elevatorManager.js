const Elevator = require("./elevator");

class ElevatorSystem {
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

  //Metod för att hitta närmaste lediga hiss
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

  //Metod för att hantera anrop till en hiss
  async handleCalls(destinationFloor) {
    try {
      const checkInvalidreq = this.checkInvalidFloorReq(destinationFloor);
      const checkElavatorOnFloor =
        this.checkIfElevatorOnFloor(destinationFloor);
      const closestIdleElevator =
        this.findClosestIdleElevator(destinationFloor);
    } catch (error) {
      console.error("An error occured in handleCalls:", error.message);
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

  findClosestIdleElevator(destinationFloor) {
    const idleElevator = this.findClosestElevator(destinationFloor);
    if (idleElevator) {
      idleElevator.moveToFloor(destinationFloor);
      console.log(
        `Elevator ${idleElevator.elevatorId} has moved to ${destinationFloor}.`
      );
    } else {
      this.addToCallQueueArr(destinationFloor);
    }
  }

  //Metod för att lägga till anrop i kön när hissar är upptagna
  addToCallQueueArr(destinationFloor) {
    this.callQueueArr.push(destinationFloor);
    console.log(`Call added to queue for floor ${destinationFloor}.`);
  }

  //Metod för att ta bort det äldsta anropet i kön (FIFO - First-In-First-Out)
  getOldestCallFromQueue() {
    //1. Så länge det finns element i callQueueArr
    if (this.callQueueArr.length > 0) {
      //2. ta bort första elementet i kön
      return this.callQueueArr.shift();
    }
    //3. return null om kön är tom
    return null;
  }

  //Metod för att processa kön:
  processQueue() {
    if (this.callQueueArr.length === 0) {
      return; // Exit if queue is empty
    }

    const idleElevator = this.findClosestElevator(this.callQueueArr[0]);
    if (idleElevator) {
      const oldestCall = this.getOldestCallFromQueue();
      idleElevator.move(oldestCall).then(() => {
        console.log(
          `Elevator ${idleElevator.elevatorId} has moved to ${oldestCall} from queue.`
        );
      });
    }
  }

  //Metod för att se om specifik hiss är ledig
  isElevatorAvailable(elevatorId) {
    const elevator = this.elevatorArr[elevatorId - 1]; // Justera id så matchar m array-index
    return elevator && !elevator.isMoving;
  }

  //Metod för att hämta hissstatus
  getElevatorStatus() {
    return this.elevatorArr.map((elevator) => ({
      elevatorId: elevator.elevatorId,
      currentFloor: elevator.currentFloor,
      isMoving: elevator.isMoving,
      currentStatus: elevator.currentStatus,
    }));
  }
}

module.exports = ElevatorSystem;
