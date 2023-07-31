const prompt = require("prompt-sync")();

//Elevator system
class ElevatorSystem {
  constructor(numberOfElevators, numberOfFloors) {
    this.numberOfElevators = numberOfElevators;
    this.numFloors = numberOfFloors;
    this.elevatorList = []; //Lagras hissar i array
    this.floorTravelTime = 2000;
    this.isMoving = false;
    this.currentFloor = 1;
    this.status = []; //Lagrar status för systemet
  }
  //Call Elevator:
  callElevator(destinationFloor) {
    //Implementera Logiken
    console.log(`Calling Elvator from ${startFloor} to ${destinationFloor}...`);
  }
}

//Elevator Class
class Elevator {
  constructor() {
    this.currentFloor = 1;
    this.isMoving = false;
    this.floorTravelTime = 2000; // 2sec
    this.status = []; // Store elevator status
    this.numFloors = 10;
  }

  //2. Method to move Elevator
  goToFloor(floor) {
    if (floor < 1 || floor > this.numFloors) {
      console.log("Invalid floor number.");
      return;
    }

    if (floor === this.currentFloor) {
      console.log("Already on floor", floor);
      return;
    }

    // Calculate travel time
    const travelTime =
      Math.abs(floor - this.currentFloor) * this.floorTravelTime;

    // Set the elevator to moving state
    this.isMoving = true;
    console.log("Moving from floor", this.currentFloor, "to floor", floor);

    // Use setTimeout to simulate travel time and update the current floor
    setTimeout(() => {
      this.currentFloor = floor;
      this.isMoving = false;
      console.log("Arrived at floor", this.currentFloor);

      // Update the status array
      this.status.push({
        floor: this.currentFloor,
        isMoving: this.isMoving,
      });
    }, travelTime);
  }

  getElevatorStatus() {
    console.log("Elevator Status:");
    console.log(
      `Current floor: ${this.currentFloor}, isMoving: ${this.isMoving}`
    );
  }
}

//3 Create an elevator object
const Elevator1 = new Elevator();
const Elevator2 = new Elevator();
const Elevator3 = new Elevator();
Elevator1.getElevatorStatus();
Elevator2.getElevatorStatus();
Elevator3.getElevatorStatus();

//Elevator System object
const ElevatorSystem = new ElevatorSystem(3, 10);

// Prompt the user for the floor number and call goToFloor
const floor = parseInt(prompt("Enter the floor number (1 or 10): "));
Elevator1.goToFloor(floor);
