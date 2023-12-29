import mongoose, { get } from "mongoose";
import { createElevators } from "./crudOperations.js";

const elevatorSchema = new mongoose.Schema({
  elevatorId: String,
  currentFloor: Number,
  status: {
    type: String,
    enum: ["idle", "moving_up", "moving_down"],
  },
  destinationFloor: Number,
  callQueue: [],
});

export const ElevatorModel = mongoose.model("Elevator", elevatorSchema);

export async function checkIfElevatorDocumentExist() {
  const count = await ElevatorModel.countDocuments();
  if (count === 0) {
    await createElevators();
    console.log("Created Elevator models in the database");
  } else console.log("Elevator models exist in the database!");
}
