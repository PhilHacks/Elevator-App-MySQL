import React, { useState } from 'react'
import axios from 'axios'

function CallElevator() {
const [floor, setFloor] = useState("");



const submit = () => {
    axios.post("http://localhost:5000/callElevator", {floor: floor})
    .then(response => alert("Elevator called"))
    .catch(error => alert("Something went wrong"));
};



  return (
    <div>
    <h2>Call Elevator</h2>
    <input type="number" value={floor} onChange={e => setFloor(e.target.value)}></input>
    <button onClick={submit}>Call Elevator</button>
    </div>
  )
}

export default CallElevator