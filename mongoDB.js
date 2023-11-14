import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

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
