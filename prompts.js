const prompt = require("prompt-sync")();

//Prompt to Call elevator to to x
function promptElevator() {
  const elevatorCall = prompt(
    "Call elevator by typing: Call to (desired floor)"
  );
  //2. parse input from userinput
  const desiredFloor = parseInt(elevatorCall.split(" ").pop());

  //3.kontrollera att våningen finns inom 1-10
  if (desiredFloor >= 1 && desiredFloor <= 10) {
    elevatorSystem.callElevator(desiredFloor);
  } else {
    console.log("Error: Choose a floor between 1-10");
    //4. Recursive call om våningen inte finns
    promptElevator();
  }
}
promptElevator();

//Prompt to get elevatorStatus:
function elevatorStatusPrompt() {
  const elevatorStatusInput = prompt(
    "Get Elevator Status by typing 'Status'"
  ).toLowerCase();

  if (elevatorStatusInput === "status") {
    const elevatorStatusList = displayElevatorStatus.call(this);

    // Log the elevator status
    console.log("Elevator Status:");
    for (const elevatorStatus of elevatorStatusList) {
      console.log(
        `Elevator ${elevatorStatus.elevatorId}: Current Floor: ${elevatorStatus.currentFloor}, isMoving: ${elevatorStatus.isMoving}, currentStatus: ${elevatorStatus.currentStatus}`
      );
    }
  } else {
    console.log("Invalid command. Please type 'Status' ");
    // You can handle invalid commands as needed, e.g., repeat the prompt
    elevatorStatusPrompt();
  }
}
elevatorStatusPrompt();

module.exports = {
  promptElevator,
  elevatorStatusPrompt,
};
