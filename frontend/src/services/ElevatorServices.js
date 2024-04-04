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
  return response.data;
};
