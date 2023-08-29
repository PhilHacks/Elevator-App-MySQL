//1.Elevator Class(blueprint) with properties(attributes)
export default class Elevator {
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

    //1.2 Use setTimeout to simulate travel time and update the current floor
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

//Exportera
