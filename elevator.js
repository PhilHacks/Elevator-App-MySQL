//Elevator Class
class Elevator {
  constructor(elevatorId) {
    this.elevatorId = elevatorId;
    this.currentFloor = 1;
    this.currentStatus = "idle"; //  lagrar hissens status idle, movingUp, movingDown
    this.isMoving = false;
    this.floorTravelTimeMs = 2000; // 2sec
    this.statusHistory = [];
  }

  //Methods:
  moveToFloor(destinationFloor) {
    this.calculateTravelTime(destinationFloor);
    this.setToMovingState(destinationFloor);
    this.simulateTravelTime(destinationFloor);
    this.updateStatusArr(destinationFloor);
    return this;
  }

  calculateTravelTime(destinationFloor) {
    return (
      Math.abs(destinationFloor - this.currentFloor) * this.floorTravelTimeMs
    );
  }

  setToMovingState(destinationFloor) {
    if (destinationFloor > this.currentFloor) {
      this.currentStatus = "moving_Up";
    } else if (destinationFloor < this.currentFloor) {
      this.currentStatus = "moving_Down";
    }
    this.isMoving = true;
    console.log(
      `Elevator ${this.elevatorId} is moving from floor`,
      this.currentFloor,
      "to floor",
      destinationFloor
    );
    return this;
  }

  simulateTravelTime(destinationFloor) {
    const travelTime = this.calculateTravelTime(destinationFloor);

    setTimeout(() => {
      this.currentFloor = destinationFloor;
      this.isMoving = false;
      this.currentStatus = "idle";
      console.log(
        `Elevator ${this.elevatorId} arrived at floor ${this.currentFloor}`
      );
    }, travelTime);
  }

  updateStatusArr() {
    this.statusHistory.push({
      floor: this.currentFloor,
      isMoving: this.isMoving,
      currentStatus: this.currentStatus,
    });
    return this.statusHistory;
  }
}

module.exports = Elevator;
