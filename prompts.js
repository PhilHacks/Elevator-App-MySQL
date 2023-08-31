const prompt = require("prompt-sync")();

//Prompt to Call elevator to to x
//1.prompta användare att kunna göra calls
function promptElevator() {
  const elevatorCall = prompt(
    "Call elevator by typing: Call to (desired floor)"
  );

  //2.parsa input
  const desiredFloor = parseInt(elevatorCall.split(" ").pop());

  //3.kontrollera att våningen finns inom 1-10
  if (desiredFloor < 0 && desiredFloor > 10) {
    console.log("Error; Choose a floor between 1-10");
    //4. Kör igen om våningen inte finns
    promptElevator();

    //5.om våningen är giltig:kalla metoden till rättvåning
    //b. visa meddelande att hissen förflyttats
  } else {
    this.callElevator(desiredFloor);
  }
}
promptElevator();

//Prompt to get elevatorStatus:
function elevatorStatusPrompt() {
  const elevatorStatus = prompt("Get Elevator Status by typing Status");
  this.displayElevatorStatus(elevatorStatus);

  //1. Implement so user can type "Elevator Status" in terminal
  //2. call on displayElevatorStatus
  //3. return all current floors on all elevators
}

elevatorStatusPrompt();
