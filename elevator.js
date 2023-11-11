class Elevator {
  constructor(elevatorId) {
    this.elevatorId = elevatorId;
    this.currentFloor = 1;
    this.currentStatus = "idle"; //  lagrar hissens status idle, movingUp, movingDown
    this.isMoving = false;
    this.floorTravelTimeMs = 2000; // 2sec
    this.statusHistory = [];
  }

  moveToFloor(destinationFloor) {
    return new Promise((resolve, reject) => {
      try {
        this.calculateTravelTime(destinationFloor);
        this.setToMovingState(destinationFloor);
        this.simulateTravelTime(destinationFloor);
        this.updateStatusArr(destinationFloor);
        resolve();
      } catch (error) {
        console.error("An error occurred in moveToFloor:", error.message);
        reject(error);
      }
    });
  }

  calculateTravelTime(destinationFloor) {
    try {
      if (isNaN(destinationFloor) || destinationFloor < 1) {
        throw new Error("Invalid destination floor.");
      }
      return (
        Math.abs(destinationFloor - this.currentFloor) * this.floorTravelTimeMs
      );
    } catch (error) {
      console.error("An error occurred in calculateTravelTime:", error.message);
    }
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
      try {
        this.currentFloor = destinationFloor;
        this.isMoving = false;
        this.currentStatus = "idle";
        console.log(
          `Elevator ${this.elevatorId} arrived at floor ${this.currentFloor}`
        );
      } catch (error) {
        console.error("An error occurred during simulation:", error.message);
      }
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

export default Elevator;
