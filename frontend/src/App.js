import "./App.css";
import ElevatorStatus from "./components/ElevatorStatus";
import CallElevator from "./components/CallElevator";
import UpdateStatus from "./components/UpdateStatus";
function App() {
  return (
    <div>
      <ElevatorStatus></ElevatorStatus>
      <CallElevator></CallElevator>
      <UpdateStatus></UpdateStatus>
    </div>
  );
}

export default App;
