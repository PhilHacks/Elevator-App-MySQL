import pool from "./dbConnect.js";

export async function getElevatorStatus() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM elevators");
  connection.release();
  console.log(rows);
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

//Kör
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
    elevator_id = handleNullOrUndefined(elevator_id, null);
    current_status = handleNullOrUndefined(current_status, null);
    current_floor = handleNullOrUndefined(current_floor, null);
    // Set destination_floorToUpdate to null if current_status is "idle"
    const destination_floorToUpdate =
      current_status === "idle" ? null : destination_floor;

    const sqlQuery =
      "UPDATE elevators SET current_status = ?, current_floor = ?, destination_floor = ? WHERE elevator_id = ?";

    const [result] = await pool.execute(sqlQuery, [
      current_status,
      current_floor,
      destination_floorToUpdate,
      elevator_id,
    ]);
  } catch (error) {
    console.error(
      `Error updating elevator ${elevator_id}:`,
      error.message,
      "Details:",
      {
        elevator_id,
        current_status,
        current_floor,
        destination_floor,
      }
    );
    throw error; // Re-throw the error to handle it at the caller level
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

//queue related functions:
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
