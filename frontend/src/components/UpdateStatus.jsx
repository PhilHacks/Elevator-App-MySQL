import React, { useState } from "react";
import styled from "styled-components";

const UpdateStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 550px;
  height: 142px;
  background-color: #007bff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
`;

const Headline = styled.h2`
  background-color: transparent;
  margin-top: 0;
`;

const SelectDropDown = styled.select`
  padding: 10px;
  margin: 0px;
  border-radius: 6px;
`;

const UpdateButton = styled.button`
  cursor: pointer;
  border-radius: 8px;
  background-color: #f4e603; /* Bright yellow */
  padding: 10px 20px;
  margin: 5px;
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

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const MessageContainer = styled.div`
  height: 1px;
`;

const ErrorMessage = styled.div`
  color: #dc3545; /* Bootstrap red color */
  margin-top: 5px;
`;

function UpdateStatus({ onUpdateElevatorStatus, message }) {
  const [selectedElevatorId, setSelectedElevatorId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [currentFloor, setCurrentFloor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const updateElevatorStatus = async () => {
    if (!selectedElevatorId || !newStatus) {
      setErrorMessage("Please select both an elevator and a new status.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    await onUpdateElevatorStatus(selectedElevatorId, newStatus, currentFloor);
    console.log(selectedElevatorId, newStatus);
    setSelectedElevatorId("");
    setNewStatus("");
    setCurrentFloor("");
  };

  return (
    <UpdateStatusContainer>
      <Headline>Update Elevator Status</Headline>
      <FlexRow>
        <SelectDropDown
          value={selectedElevatorId}
          onChange={(e) => setSelectedElevatorId(e.target.value)}
        >
          <option value="">Select Elevator</option>
          <option value="1">Elevator 1</option>
          <option value="2">Elevator 2</option>
          <option value="3">Elevator 3</option>
        </SelectDropDown>
        <SelectDropDown
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select New Status</option>
          <option value="idle">idle</option>
          <option value="out_of_service">out of service</option>
        </SelectDropDown>
        <UpdateButton onClick={updateElevatorStatus}>Update</UpdateButton>
      </FlexRow>
      <MessageContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {message && <p>{message}</p>}
      </MessageContainer>
    </UpdateStatusContainer>
  );
}

export default UpdateStatus;
