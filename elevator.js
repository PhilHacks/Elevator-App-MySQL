//Elevator Class(blueprint) with properties(attributes)
class Elevator {
  constructor(elevatorId) {
    this.elevatorId = elevatorId;
    this.currentFloor = 1;
    this.currentStatus = "idle"; //  lagrar hissens status idle, movingUp, movingDown
    this.isMoving = false;
    this.floorTravelTime = 2000; // 2sec
    this.statusHistory = [];
  }

  //Method() to move Elevator
  goToFloor(destinationFloor) {
    return new Promise((resolve, reject) => {
      // Calculate travel time
      const travelTime =
        Math.abs(destinationFloor - this.currentFloor) * this.floorTravelTime;

      // Set elevator to moving state
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

      //SetTimeout simulate travel time
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
        resolve();
      }, travelTime);
    });
  }
}

module.exports = Elevator;
