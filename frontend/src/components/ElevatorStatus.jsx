import styled from "styled-components";
import { LuChevronUpCircle } from "react-icons/lu";

const StatusContainer = styled.div`
  background-color: #007bff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  width: 550px;
`;

const Headline = styled.h2`
  color: #ffffff;
  background-color: #007bff;
  text-align: center;
`;

const StatusList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const ElevatorNumber = styled.span`
  font-weight: bold;
  background-color: transparent;
`;
const StatusListItem = styled.li`
  border: 4px solid #e7f1ff;
  border-radius: 8px;
  padding: 20px;
  background-color: transparent;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const PropertyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Property = styled.span`
  min-width: 120px;
  font-size: 16px;
  margin-right: 10px;
  display: inline-block;

  &.destination,
  &.status {
    width: 250px;
    margin-right: 0;
  }

  &.status > svg {
    margin-left: 5px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: white;
  padding: 4px;
  background-color: #d9534f;
  font-weight: bold;
  height: -1px;
  opacity: 0;

  /* Only make the error message visible if it has content */
  ${({ hasContent }) =>
    hasContent &&
    `
    opacity: 1; 
  `}
`;

const ArrowIcon = styled.span`
  margin-left: 5px;
  color: red;
`;

function ElevatorStatus({ elevators, message }) {
  return (
    <StatusContainer>
      <Headline>Elevator Status</Headline>
      <StatusList>
        {elevators.map((elevator) => (
          <StatusListItem key={elevator.elevatorId}>
            <ElevatorNumber>Elevator {elevator.elevatorId}:</ElevatorNumber>
            <PropertyContainer>
              <Property>Current floor: {elevator.currentFloor}</Property>
              <Property className="destination">
                Destination Floor: {elevator.destinationFloor}
              </Property>
              <Property className="status">
                Status: {elevator.currentStatus}
              </Property>
              {elevator.currentStatus === "moving_up" && (
                <ArrowIcon>
                  <LuChevronUpCircle />
                </ArrowIcon>
              )}
            </PropertyContainer>
          </StatusListItem>
        ))}
      </StatusList>
      {<ErrorMessage hasContent={!!message}>{message}</ErrorMessage>}
    </StatusContainer>
  );
}

export default ElevatorStatus;
