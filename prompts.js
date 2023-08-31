const prompt = require("prompt-sync")();

//Prompt to Call elevator to to x
//1.prompta användare att kunna göra calls
function promptElevator() {
  const elevatorCall = prompt(
    "Call elevator by typing: Call to (desired floor)"
  );

  //2.ta user prompt
  const desiredFloor = parseInt(elevatorCall.split(" ").pop());

  //3.parsa input till metoden

  //4.kontrollera att våningen finns inom 1-10
  if (desiredFloor < 0 && desiredFloor > 10) {
    console.log("Error; Choose a floor between 1-10");
    promptElevator();

    //5.om våningen är giltig:kalla metoden till rättvåning
    //b. visa meddelande att hissen förflyttats
  } else {
    this.callElevator(desiredFloor);
  }
}
promptElevator();

//7.upprepa steg ovan till rätt prompt tagits

//Prompt to get elevatorStatus:
const elevatorStatus = prompt("Get Elevator Status by typing Status");
