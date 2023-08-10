const prompt = require("prompt-sync")();

//1.Elevator Class
class Elevator {
  constructor() {
    this.currentFloor = 1;
    this.isMoving = false;
    this.floorTravelTime = 2000; // 2sec
    this.numFloors = 10;
    this.status = []; //  lagrar hissens status
  }

  //Method to move Elevator
  goToFloor(floor) {
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

//2. Elevator System
class ElevatorSystem {
  constructor(numberOfElevators, numberOfFloors) {
    this.numberOfElevators = numberOfElevators;
    this.numFloors = numberOfFloors;
    this.elevatorList = []; // Lagrar hissarna i en array

    // Skapa alla hissar och lägg till dem i listan
    for (let i = 0; i < numberOfElevators; i++) {
      this.elevatorList.push(new Elevator());
    }
  }

  // Metod för att visa status på alla hissar
  displayElevatorStatus() {
    console.log("Elevator Status:");
    for (let i = 0; i < this.elevatorList.length; i++) {
      const elevator = this.elevatorList[i];
      console.log(
        `Elevator ${i + 1}: Current Floor: ${
          elevator.currentFloor
        }, isMoving: ${elevator.isMoving}`
      );
    }
  }

  // Metod för att hantera anrop till en hiss
  callElevator(destinationFloor) {
    let closestElevator = null;
    let closestDistance = Infinity;

    //Hitta närmaste hiss genom att loopa elevatorList
    for (let i = 0; i < this.elevatorList.length; i++) {
      const elevator = this.elevatorList[i];
      const distanceToFloor = Math.abs(
        elevator.currentFloor - destinationFloor
      );

      if (!elevator.isMoving && distanceToFloor < closestDistance) {
        closestElevator = elevator;
        closestDistance = distanceToFloor;
      }
    }

    if (closestElevator) {
      //Flytta närmaste hiss genom att kalla på goToFloor
      closestElevator.goToFloor(destinationFloor);

    //Uppdatera hissarnas status
    this.displayElevatorStatus();
    console.log (`Elevator has moved to ${destinationFloor}.`);
  }

  // Metod för att hantera flera hissanrop när alla hissar är upptagna
  handleCalls() {
    // Implementera logiken för att hantera flera hissanrop
  }

  // Metod för att undvika dubbla hissanrop
  avoidDuplicateCalls(floor) {
    // Implementera logiken för att undvika dubbla hissanrop
  }
}
