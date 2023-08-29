import Elevator from "./elevator";

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
  findClosestElevator(destinationFloor) {
    let closestElevator = null;
    let closestDistance = Infinity;

    for (const elevator of this.elevatorList) {
      if (!elevator.isMoving) {
        const distanceToFloor = Math.abs(
          elevator.currentFloor - destinationFloor
        );
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
    } else {
      //om alla hissar är upptagna
      this.addToCallQueue(destinationFloor);
    }
  }

  // 2.5 Metod för att undvika dubbla hissanrop
  avoidDuplicateCalls(destinationFloor) {
    // 1. Kontrollera om hiss redan har samma destination som det aktuella anropet.
    const duplicateDestination = this.elevatorList.some(
      (elevator) => elevator.currentFloor === destinationFloor
    );
    console.log(duplicateDestination);

    // 2. Om ingen hiss har samma destination, välj en hiss baserat på prioritering
    if (!duplicateDestination) {
      const closestElevator = this.findClosestElevator(destinationFloor);
      // 3. Flytta den valda hissen till den avoided destinationen
      closestElevator.goToFloor(destinationFloor);

      // Uppdatera hissarnas status
      this.displayElevatorStatus();
      console.log(`Elevator has moved to ${destinationFloor}.`);
    }
  }

  // 2.6 Metod för att lägga till anrop i kön när hissar är upptagna
  addToCallQueue(destinationFloor) {
    //Lägg till destinationFloor i callQueue
    this.callQueue.push(destinationFloor);
    console.log(`Call added to queue for floor ${destinationFloor}.`);

    // Uppdatera hissarnas status
    this.displayElevatorStatus();
  }

  //2.7 metod för att ta bort det äldsta anropet i kön
  getOldestCallFromQueue() {
    //1. Så länge det finns element i callQueue
    if (this.callQueue.length > 0) {
      //2. ta bort första elementet i kön
      return this.callQueue.shift();
    }
    //3. return null om kön är tom
    return null;
  }
}

// En kö är en vanlig datalagringsstruktur som fungerar enligt
// principen "först in, först ut" (FIFO - First-In-First-Out).
