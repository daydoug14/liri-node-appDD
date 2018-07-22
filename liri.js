require("dotenv").config();
var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputString = process.argv;

// Parses the command line argument to capture the "command" (add, subtract, multiply, etc) and the numbers
var command = inputString[2];
var num1 = inputString[3];
var num2 = inputString[4];

// Here's the variable we will be modifying with the new numbers
var outputNum;

// Determines the command selected...
// Based on the command we run the appropriate math on the two numbers
if (command === "add") {
  outputNum = parseFloat(num1) + parseFloat(num2);
}

else if (command === "subtract") {
  outputNum = parseFloat(num1) - parseFloat(num2);
}

else if (command === "multiply") {
  outputNum = parseFloat(num1) * parseFloat(num2);
}

else if (command === "divide") {
  outputNum = parseFloat(num1) / parseFloat(num2);
}


