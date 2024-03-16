import React, { useEffect, useState } from 'react'
import axios from 'axios'



function ElevatorStatus() {
const [status, setStatus] = useState([]);


useEffect(() => {
    axios.get("http://localhost:5000/elevator/status")
    .then(response => setStatus(response.data))
    .catch(error => console.error("Something has gone wrong", error))
}, []);

return (
    <div>
      <h2>Elevator Status</h2>
      <ul>
        {status.map(elevator => (
          <li key={elevator.id}>
            Elevator {elevator.elevatorId}: Currently at floor {elevator.currentFloor}, Status: {elevator.currentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElevatorStatus