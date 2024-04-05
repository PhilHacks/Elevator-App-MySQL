import pool from "./dbConnect.js";

export async function getElevatorStatus() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM elevators");
  connection.release();
  // console.log("Elevator Status", rows);
  return rows; // If you want to use the result outside the function
}

export async function isElevatorAvailable(elevator_id) {
  const [rows] = await pool.execute(
    "SELECT * FROM elevators WHERE elevator_id = ?",
    [elevator_id]
  );

  if (rows.length === 0) {
    return false;
  }

  const elevator = rows[0];
  return elevator.current_status === "idle";
}

export async function findIdleElevators() {
  const [rows] = await pool.execute(
    "SELECT elevator_id, current_floor, current_status FROM elevators WHERE current_status IN ('idle', 'moving')"
  );

  return rows;
}

export async function checkIfElevatorOnFloor(destination_floor) {
  const [rows] = await pool.execute(
    "SELECT * FROM elevators WHERE current_floor = ? AND current_status = 'idle'",
    [destination_floor]
  );

  if (rows.length > 0) {
    console.log(`Elevator already at floor ${destination_floor}`);
    return true;
  }
  return false;
}

export async function updateElevatorFloorOnly(elevator_id, current_floor) {
  const result = await pool.execute(
    "UPDATE elevators SET current_floor = ? WHERE elevator_id = ?",
    [current_floor, elevator_id]
  );
}

export function handleNullOrUndefined(value, defaultValue) {
  return value !== undefined && value !== null ? value : defaultValue;
}

export async function updateElevatorDB(
  elevator_id,
  current_status,
  current_floor,
  destination_floor
) {
  try {
    console.log("Elevator ID:", elevator_id);
    console.log("Current Status:", current_status);
    console.log("Current Floor:", current_floor);
    console.log("Destination Floor:", destination_floor);

    // Ensure elevator_id and current_status are always provided
    if (!elevator_id || !current_status) {
      console.error("Elevator ID and current status are required.");
      return; // Return early to prevent further execution
    }

    // If current_floor is not provided, fetch it from the database
    if (current_floor === undefined || current_floor === null) {
      const [rows] = await pool.execute(
        "SELECT current_floor FROM elevators WHERE elevator_id = ?",
        [elevator_id]
      );
      current_floor = rows[0].current_floor;
    }

    // If destination_floor is not provided, keep it null
    if (destination_floor === undefined || destination_floor === null) {
      destination_floor = null;
    }

    // Update the elevators table in the database
    const sqlQuery =
      "UPDATE elevators SET current_status = ?, current_floor = ?, destination_floor = ? WHERE elevator_id = ?";
    const [result] = await pool.execute(sqlQuery, [
      current_status,
      current_floor,
      destination_floor,
      elevator_id,
    ]);

    console.log("Elevator status updated successfully");
    return result;
  } catch (error) {
    console.error(`Error updating elevator ${elevator_id}:`, error.message);
    throw error;
  }
}

export async function isElevatorAtFloor(destination_floor) {
  const isElevatorOnFloor = await checkIfElevatorOnFloor(destination_floor);
  return isElevatorOnFloor;
}

export async function isElevatorHeadingToFloor(destination_floor) {
  const [rows] = await pool.execute(
    "SELECT * FROM elevators WHERE destination_floor = ?",
    [destination_floor]
  );
  return rows.length > 0;
}

//Queue functions:
export async function getCallQueueTable() {
  const [rows] = await pool.execute("SELECT * FROM call_queue");
  console.log(rows);
  return rows;
}

export async function queueElevatorCall(destination_floor) {
  const result = await pool.execute(
    "INSERT INTO call_queue (destination_floor) VALUES (?)",
    [destination_floor]
  );

  if (result[0].affectedRows > 0) {
    console.log(`Call added to queue for floor ${destination_floor}.`);
  }
}

export async function findOldestQueuedCall() {
  const [rows] = await pool.execute(
    "SELECT * FROM call_queue ORDER BY id ASC LIMIT 1"
  );

  if (rows.length > 0) {
    return rows[0].destination_floor;
  } else {
    return null;
  }
}

export async function removeCallFromQueue(destination_floor) {
  const result = await pool.execute(
    "DELETE FROM call_queue WHERE destination_floor = ? LIMIT 1",
    [destination_floor]
  );
}
