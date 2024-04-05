import styled from "styled-components";

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

function ElevatorStatus({ elevators, message }) {
  return (
    <StatusContainer>
      <Headline>Elevator Status</Headline>
      <StatusList>
        {elevators.map((elevator) => (
          <StatusListItem key={elevator.elevator_id}>
            <ElevatorNumber>Elevator {elevator.elevator_id}:</ElevatorNumber>
            <PropertyContainer>
              <Property>Current floor: {elevator.current_floor}</Property>
              <Property className="destination">
                Destination Floor: {elevator.destination_floor}
              </Property>
              <Property className="status">
                Status: {elevator.current_status}
              </Property>
            </PropertyContainer>
          </StatusListItem>
        ))}
      </StatusList>
      {<ErrorMessage hasContent={!!message}>{message}</ErrorMessage>}
    </StatusContainer>
  );
}

export default ElevatorStatus;
