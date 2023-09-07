const express = require("express");
const app = express();

const Elevator = require(".elevator/");
const ElevatorSystem = require("./elevatorSystem");
const { promptElevator } = require("./prompts");
