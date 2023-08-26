const prompt = require("prompt-sync")();

//1.Elevator Class(blueprint) with properties(attributes)
class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 1;
    this.currentStatus = "idle"; //  lagrar hissens status idle, movingUp, movingDown
    this.isMoving = false;
    this.floorTravelTime = 2000; // 2sec
    this.numFloors = 10;
    this.statusHistory = [];
  }

  //1.1 Method() to move Elevator
  goToFloor(destinationFloor) {
    // Calculate travel time
    const travelTime =
      Math.abs(destinationFloor - this.currentFloor) * this.floorTravelTime;

    // Set the elevator to moving state
    if (destinationFloor > this.currentFloor) {
      this.currentStatus = "movingUp";
    } else if (destinationFloor < this.currentFloor) {
      this.currentStatus = "movingDown";
    }
    this.isMoving = true;
    console.log(
      "Moving from floor",
      this.currentFloor,
      "to floor",
      destinationFloor
    );

    // Use setTimeout to simulate travel time and update the current floor
    setTimeout(() => {
      this.currentFloor = destinationFloor;
      this.isMoving = false;
      console.log("Arrived at floor", this.currentFloor);

      // Update the status array
      this.statusHistory.push({
        floor: this.currentFloor,
        isMoving: this.isMoving,
        currentStatus: this.currentStatus,
      });
    }, travelTime);
  }
}

//2. Elevator System
class ElevatorSystem {
  constructor(numberOfElevators, numberOfFloors) {
    this.numberOfElevators = numberOfElevators;
    this.numFloors = numberOfFloors;
    this.elevatorList = []; // Lagrar hissarna i en array
    this.callQueue = []; // Kö för att lagra anrop

    // Skapa alla hissar och lägg till dem i listan
    for (let i = 0; i < numberOfElevators; i++) {
      this.elevatorList.push(new Elevator());
    }
  }

  // 2.1 Metod för att visa status på alla hissar
  displayElevatorStatus() {
    console.log("Elevator Status:");
    for (let i = 0; i < this.elevatorList.length; i++) {
      const elevator = this.elevatorList[i];
      console.log(
        `Elevator ${i + 1}: Current Floor: ${
          elevator.currentFloor
        }, isMoving: ${elevator.isMoving}, currentStatus: ${
          elevator.currentStatus
        }`
      );
    }
  }

  // 2.2 Metod för att hitta närmaste lediga hiss
  findClosestElevator(floor) {
    let closestElevator = null;
    let closestDistance = Infinity;

    for (const elevator of this.elevatorList) {
      if (!elevator.isMoving) {
        const distanceToFloor = Math.abs(elevator.currentFloor - floor);
        if (distanceToFloor < closestDistance) {
          closestElevator = elevator;
          closestDistance = distanceToFloor;
        }
      }
    }
    return closestElevator;
  }

  // 2.3 Metod för att hantera anrop till en hiss
  callElevator(destinationFloor) {
    // Hitta närmaste lediga hiss genom findClosestElevator-metoden
    const closestElevator = this.findClosestElevator(destinationFloor);

    if (closestElevator) {
      //Flytta närmaste hiss genom att kalla på goToFloor
      closestElevator.goToFloor(destinationFloor);
    } else {
      //lägg anropet i kön
      this.callQueue.push(destinationFloor);
      console.log(`Elevator called to floor ${destinationFloor}.`);
    }
    //Uppdatera hissarnas status
    this.displayElevatorStatus();
    console.log(`Elevator has moved to ${destinationFloor}.`);
  }

  //2.4 Metod för att hantera flera hissanrop när alla hissar är upptagna
  handleCalls(destinationFloor) {
    // 1. Letar efter lediga hissar som inte rör sig
    const idleElevator = this.elevatorList.find(
      (Elevator) => !Elevator.isMoving
    );

    if (idleElevator) {
      // Använd närmaste lediga hiss om tillgänglig
      const closestElevator = this.findClosestElevator(destinationFloor);
      // 3. Flytta den valda hissen till den önskade destinationen
      closestElevator.goToFloor(destinationFloor);

      // Uppdatera hissarnas status
      this.displayElevatorStatus();
      console.log(`Elevator has moved to ${destinationFloor}.`);
    }
    //om alla hissar är upptagna
    else {
      this.callQueue.push(destinationFloor);
    }
  }

  // 2.5 Metod för att undvika dubbla hissanrop
  avoidDuplicateCalls(floor) {
    // 1. Kontrollera om hiss redan har samma destination som det aktuella anropet.
    const duplicateDestination = this.elevatorList.some(
      (elevator) => elevator.currentFloor === destinationFloor
    );
    console.log(duplicateDestination);

    // 2. Om ingen hiss har samma destination, välj en hiss baserat på prioritering

    // 3. Flytta den valda hissen till den undvikna destinationen
    goToFloor(destinationFloor);
  }

  // 2.6 Metod för att lägga till anrop i kön när hissar är upptagna
  addToCallQueue(floor) {
    // En kö är en vanlig datalagringsstruktur som fungerar enligt
    // principen "först in, först ut" (FIFO - First-In-First-Out).
  }
}
