const elevatorSchema = new mongoose.Schema({
  id: String,
  currentFloor: Number,
  status: {
    type: String,
    enum: ["idle", "moving_up", "moving_down"],
  },
  destinationFloor: Number,
});

export const ElevatorModel = mongoose.model("Elevator", elevatorSchema);
