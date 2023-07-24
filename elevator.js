const prompt = require("prompt-sync")();

//1. Skapa Elevator Class
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

// Create an elevator object
const elevator = new Elevator();
elevator.getElevatorStatus();

// Prompt the user for the floor number and call goToFloor
const floor = parseInt(prompt("Enter the floor number (1 or 10): "));
elevator.goToFloor(floor);
