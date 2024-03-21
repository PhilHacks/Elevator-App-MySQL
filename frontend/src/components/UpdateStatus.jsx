import React, { useState } from "react";
import axios from "axios";

function UpdateStatus() {
  const [selectedElevatorId, setSelectedElevatorId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [message, setMessage] = useState("");

  const updateElevatorStatus = () => {
    console.log(selectedElevatorId, newStatus);
    axios
      .put("http://localhost:5000/updateElevatorStatus", {
        id: selectedElevatorId,
        status: newStatus,
      })
      .then((response) => {
        setMessage(response.data.message);
        setNewStatus("");
        setSelectedElevatorId("");
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Something went wrong");
        setNewStatus("");
        setSelectedElevatorId("");
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Update Elevator Status</h2>
      <select
        value={selectedElevatorId}
        onChange={(e) => setSelectedElevatorId(e.target.value)}
      >
        <option value="">Select Elevator</option>
        <option value="1">Elevator 1</option>
        <option value="2">Elevator 2</option>
        <option value="3">Elevator 3</option>
      </select>
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="">Select New Status</option>
        <option value="idle">idle</option>
        <option value="out_of_service">out of service</option>
      </select>
      <button onClick={updateElevatorStatus}>Update</button>
      {message && <div>{message}</div>}
    </div>
  );
}

export default UpdateStatus;
