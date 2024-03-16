import React from 'react'
import axios from 'axios'

function UpdateStatus() {


  // axios.put("http://localhost:5000/updateElevatorStatus", 
  // { id: elevatorId, 
  //   status: newStatus, 
  //   destinationFloor: newDestination })
  //   .then()
  //   .catch()

  return (
    <div>
    <h2>Update Status</h2>
    <select>Elevator</select>
    <input></input>
    <input></input>
    <button>Update</button>
    </div>
  )
}

export default UpdateStatus