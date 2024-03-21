import React, { useEffect, useState } from "react";
import axios from "axios";

function CallQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchCallQueue = () => {
      axios
        .get("http://localhost:5000/elevator/status")
        .then((response) => {
          const sharedQueue = response.data[0]?.callQueue || [];
          setQueue(sharedQueue);
        })
        .catch((error) => {
          console.error("Failed to fetch queue:", error.message);
        });
    };

    fetchCallQueue();
    const interval = setInterval(fetchCallQueue, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Call Queue</h2>
      {queue.length > 0 ? (
        <ul>
          {queue.map((floor, index) => (
            <li key={index}>Floor {floor}</li>
          ))}
        </ul>
      ) : (
        <p>No pending calls.</p>
      )}
    </div>
  );
}

export default CallQueue;
