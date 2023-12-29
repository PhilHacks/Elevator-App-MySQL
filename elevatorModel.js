import mongoose, { get } from "mongoose";
import { createElevatorsInDB } from "./crudOperations.js";

const elevatorSchema = new mongoose.Schema({
  elevatorId: String,
  currentFloor: Number,
  currentStatus: {
    type: String,
    enum: ["idle", "moving_up", "moving_down"],
  },
  destinationFloor: Number,
  callQueue: Array,
});

export const ElevatorModel = mongoose.model("Elevator", elevatorSchema);

export async function checkIfElevatorDocumentExist() {
  const count = await ElevatorModel.countDocuments();
  if (count === 0) {
    await createElevatorsInDB();
    console.log("Created Elevator models in the database");
  } else console.log("Elevator models exist in the database!");
}
