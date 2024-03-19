import React, { useEffect, useState } from 'react'
import axios from 'axios'



function ElevatorStatus() {
const [status, setStatus] = useState([]);
const [message, setMessage] =useState("");

useEffect(() => {
  const fetchElevatorStatus = () => {
    axios.get("http://localhost:5000/elevator/status")
      .then(response => {
        setStatus(response.data)
        setMessage(""); 
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "Unable to fetch elevator status. Please try again later.";
        setMessage(errorMessage)
      });
  };

 fetchElevatorStatus();

  const statusInterval = setInterval(fetchElevatorStatus, 2000);

  return () => clearInterval(statusInterval);
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
      {message && <div>{message}</div>}
    </div>
  );
};

export default ElevatorStatus