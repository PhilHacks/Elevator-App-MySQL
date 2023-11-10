const Elevator = require("./elevator.js");

//Elevator System
class ElevatorSystem {
  constructor() {
    this.numberOfElevators = 3;
    this.numFloors = 10;
    this.elevatorList = []; // stores elevators in array
    this.callQueue = []; // Queue to store calls

    // Skapa alla hissar och lägg till dem i listan
    for (let i = 0; i < this.numberOfElevators; i++) {
      this.elevatorList.push(new Elevator(i + 1));
    }
    setInterval(() => this.processQueue(), 2000); // Check every 2 seconds
  }

  //Metod för att hitta närmaste lediga hiss
  findClosestElevator(destinationFloor) {
    return (
      this.elevatorList
        .filter((elevator) => !elevator.isMoving) // Filtrera ut hissarna som inte rör sig
        .sort(
          (a, b) =>
            Math.abs(a.currentFloor - destinationFloor) -
            Math.abs(b.currentFloor - destinationFloor)
        ) // Sortera efter avstånd till destinationFloor
        .shift() || null
    ); // Returnera den första hissen i listan (närmast) eller null om listan är tom.
  }

  //Metod för att hantera anrop till en hiss
  async handleCalls(destinationFloor) {
    if (destinationFloor < 1 || destinationFloor > this.numFloors) {
      throw new Error("Invalid floor requested.");
    }

    // Kontrollera om någon hiss redan är på den önskade våningen och inte rör sig
    const elevatorOnFloor = this.elevatorList.find(
      (elevator) =>
        elevator.currentFloor === destinationFloor && !elevator.isMoving
    );

    if (elevatorOnFloor) {
      console.log(`Elevator already at floor ${destinationFloor}`);
      return;
    }

    // Letar efter närmaste lediga hiss
    const idleElevator = this.findClosestElevator(destinationFloor);
    if (idleElevator) {
      // Flytta den lediga hissen till den önskade destinationen
      idleElevator.moveToFloor(destinationFloor);
      console.log(
        `Elevator ${idleElevator.elevatorId} has moved to ${destinationFloor}.`
      );
    } else {
      // om alla hissar är upptagna
      this.addToCallQueue(destinationFloor);
    }
  }

  //Metod för att lägga till anrop i kön när hissar är upptagna
  addToCallQueue(destinationFloor) {
    //Lägg till destinationFloor i callQueue
    this.callQueue.push(destinationFloor);
    console.log(`Call added to queue for floor ${destinationFloor}.`);
  }

  //Metod för att ta bort det äldsta anropet i kön (FIFO - First-In-First-Out)
  getOldestCallFromQueue() {
    //1. Så länge det finns element i callQueue
    if (this.callQueue.length > 0) {
      //2. ta bort första elementet i kön
      return this.callQueue.shift();
    }
    //3. return null om kön är tom
    return null;
  }

  //Metod för att processa kön:
  processQueue() {
    if (this.callQueue.length === 0) {
      return; // Exit if queue is empty
    }

    const idleElevator = this.findClosestElevator(this.callQueue[0]);
    if (idleElevator) {
      const oldestCall = this.getOldestCallFromQueue();
      idleElevator.moveToFloor(oldestCall).then(() => {
        console.log(
          `Elevator ${idleElevator.elevatorId} has moved to ${oldestCall} from queue.`
        );
      });
    }
  }

  //Metod för att se om specifik hiss är ledig
  isElevatorAvailable(elevatorId) {
    const elevator = this.elevatorList[elevatorId - 1]; // Justera id så matchar m array-index
    return elevator && !elevator.isMoving;
  }

  //Metod för att hämta hissstatus
  getElevatorStatus() {
    return this.elevatorList.map((elevator) => ({
      elevatorId: elevator.elevatorId,
      currentFloor: elevator.currentFloor,
      isMoving: elevator.isMoving,
      currentStatus: elevator.currentStatus,
    }));
  }
}

module.exports = ElevatorSystem;
