import axios from "axios";

export const getElevators = async () => {
  const response = await axios.get("http://localhost:5000/elevator/status");
  return response.data;
};

export const callElevator = async (floor) => {
  const response = await axios.post("http://localhost:5000/callElevator", {
    floor,
  });
  return response.data;
};

export const updateElevatorStatus = async (elevatorId, status) => {
  const response = await axios.put(
    "http://localhost:5000/updateElevatorStatus",
    {
      id: elevatorId,
      status,
    }
  );
  console.log("Response from backend:", response);
  return response.data;
};

export const getCallQueue = async () => {
  try {
    const response = await axios.get("http://localhost:5000/callqueue");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch call queue:", error);
    throw error;
  }
};
