import React, { useState } from 'react'
import axios from 'axios'

function CallElevator() {
const [floor, setFloor] = useState("");
const [message, setMessage] = useState ("") 



const submitCall = () => {
    axios.post("http://localhost:5000/callElevator", {floor: Number(floor) })
      .then(response => {
       setMessage(response.data.message);
    })
    .catch(error => {
      setMessage(error.response?.data?.message || "Something went wrong");
   })
    .finally(() => {
      setTimeout(() => {setMessage(""); setFloor("");}, 3000);
    });
    
};


  return (
    <div>
    <h2>Call Elevator</h2>
    <input type="number" value={floor} onChange={e => setFloor(e.target.value)} placeholder="Enter floor number"></input>
    
    <button onClick={submitCall}>Call Elevator</button>
    {message && <div>{message}</div>}
    </div>
  )
}

export default CallElevator