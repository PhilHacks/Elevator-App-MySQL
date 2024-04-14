import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ElevatorStatus from "./components/ElevatorStatus";
import CallElevator from "./components/CallElevator";
import UpdateStatus from "./components/UpdateStatus";
import CallQueue from "./components/CallQueue";
import {
  getElevators,
  callElevator,
  updateElevatorStatus,
  getCallQueue,
} from "./services/ElevatorServices";
import styled, { createGlobalStyle } from "styled-components";

const socket = io("http://localhost:5000");

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  margin-top: 5px;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body, #root { 
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7f1ff; 
  color: #ffffff; 
  
}
`;
const MaintenanceBtn = styled.button`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f4e603; /* Bright yellow */
  padding: 10px 20px;
  margin: 5px auto;
  border: none;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #dbcb05;
  }

  &:active {
    background-color: #c2b204;
  }
`;

function App() {
  const [elevators, setElevators] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [queue, setQueue] = useState([]);
  const [callMessage, setCallMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);

  const fetchElevatorStatus = async () => {
    try {
      const data = await getElevators();
      setElevators(data.elevators);
      if (data.length > 0) {
        setQueue(data[0].callQueue);
      }
      setStatusMessage("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch elevator status";
      setStatusMessage(errorMessage);
    }
  };

  const fetchCallQueue = async () => {
    try {
      const data = await getCallQueue();
      console.log("Call queue data:", data);
      setQueue(data);
      setStatusMessage("");
    } catch (error) {
      console.error("Failed to fetch call queue data:", error);
      setStatusMessage("Failed to fetch call queue data");
    }
  };

  const handleCallElevator = async (floor) => {
    try {
      const response = await callElevator(floor);
      console.log("Server response data:", response);
      if (response && response.message) {
        setCallMessage(response.message);
      } else {
        setCallMessage(
          "Received an unexpected response format from the server."
        );
      }
      fetchElevatorStatus();
    } catch (error) {
      console.error("Call Elevator Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setCallMessage(error.response.data.message);
      } else {
        setCallMessage("Something went wrong");
      }
    } finally {
      setTimeout(() => setCallMessage(""), 3000);
    }
  };

  const handleUpdateElevatorStatus = async (
    elevatorId,
    newStatus,
    currentFloor
  ) => {
    try {
      const response = await updateElevatorStatus(
        elevatorId,
        newStatus,
        currentFloor
      );
      setUpdateMessage(response.message);
      fetchElevatorStatus();
    } catch (error) {
      setUpdateMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setTimeout(() => setUpdateMessage(""), 3000);
    }
  };

  const toggleUpdateStatusVisibility = () => {
    setShowUpdateStatus((prevShow) => !prevShow);
  };

  useEffect(() => {
    socket.on("elevatorArrival", (data) => {
      console.log("Received data from elevatorArrival:", data);
      setCallMessage({ message: data.message });

      setTimeout(() => {
        setCallMessage("");
      }, 2000);
      fetchElevatorStatus();
    });

    return () => {
      socket.off("elevatorArrival");
    };
  }, []);

  useEffect(() => {
    fetchElevatorStatus();
    fetchCallQueue();
    const statusInterval = setInterval(fetchElevatorStatus, 2000);
    const queueInterval = setInterval(fetchCallQueue, 2000);
    return () => {
      clearInterval(statusInterval);
      clearInterval(queueInterval);
    };
  }, []);

  return (
    <div>
      <GlobalStyle />
      <ElevatorStatus elevators={elevators} message={statusMessage} />
      <CallQueue queue={queue} />
      <CallElevator
        onElevatorCall={handleCallElevator}
        callMessage={callMessage}
      />
      <MaintenanceBtn onClick={toggleUpdateStatusVisibility}>
        Maintenance Features
      </MaintenanceBtn>
      {showUpdateStatus && (
        <UpdateStatus
          onUpdateElevatorStatus={handleUpdateElevatorStatus}
          message={updateMessage}
        />
      )}
    </div>
  );
}

export default App;
