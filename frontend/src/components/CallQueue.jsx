import styled from "styled-components";

const QueueContainer = styled.div`
  background-color: #007bff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  max-width: 550px;
`;

const QueueList = styled.div`
  border: 4px solid #e7f1ff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const QueueItem = styled.span`
  background-color: #e7f1ff;
  color: #212529;
  padding: 5px 10px;
  border-radius: 5px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

function CallQueue({ queue }) {
  return (
    <QueueContainer>
      <QueueList>
        {queue.length > 0 ? (
          <ul>
            {queue.map((item) => (
              <QueueItem key={item.id}>
                Floor {item.destination_floor}
              </QueueItem>
            ))}
          </ul>
        ) : (
          <QueueItem>
            <BoldText>Call Queue:</BoldText> No pending calls
          </QueueItem>
        )}
      </QueueList>
    </QueueContainer>
  );
}

export default CallQueue;
