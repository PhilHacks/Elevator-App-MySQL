import "./App.css";
import ElevatorStatus from "./components/ElevatorStatus";
import CallElevator from "./components/CallElevator";
import UpdateStatus from "./components/UpdateStatus";
import CallQueue from "./components/CallQueue";
// import { getElevators } from "./services/ElevatorService";

function App() {
  return (
    <div>
      <ElevatorStatus></ElevatorStatus>
      <CallQueue></CallQueue>
      <CallElevator></CallElevator>
      <UpdateStatus></UpdateStatus>
    </div>
  );
}

export default App;
