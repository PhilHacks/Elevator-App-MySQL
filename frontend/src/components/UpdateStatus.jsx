import React, { useState } from 'react'
import axios from 'axios'

function UpdateStatus() {
  const [selectedElevatorId, setSelectedElevatorId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDestination, setNewDestination] = useState("");

  const updateElevatorStatus = () => {
    return;
  }
  // axios.put("http://localhost:5000/updateElevatorStatus", 
  // { id: elevatorId, 
  //   status: newStatus, 
  //   destinationFloor: newDestination })
  //   .then()
  //   .catch()

  return (
    <div>
    <h2>Update Elevator Status</h2>
    <select value={selectedElevatorId} onChange={(e) => setSelectedElevatorId(e.target.value)}>
      <option value="">Select Elevator</option>
      <option value="1">Elevator 1</option>
      <option value="2">Elevator 2</option>
      <option value="3">Elevator 3</option>
    </select>
    <input 
      placeholder='New Floor'
      value={newDestination}
      onChange={(e) => setNewDestination(e.target.value)}
    />
    <input 
      placeholder='New Status'
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
    />
    <button onClick={updateElevatorStatus}>Update</button>
    </div>
  )
}

export default UpdateStatus