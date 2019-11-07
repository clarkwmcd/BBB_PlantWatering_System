
var water = false;

//run setup function to configure pins on startup
b.pinMode(pumpPin, b.OUTPUT); // set to an output so we can use it to turn on the MOSFET
b.digitalWrite(pumpPin, b.LOW); //set to LOW so pump is not powered on start up
b.pinMode(moisturePower, b.OUTPUT); //set 4 as an output
b.digitalWrite(moisturePower, b.LOW); //set to LOW so sensor is not powered on start up

var readSensor = new Promise(
  function(resolve, reject) {
    var moisturePower = "P9_30";
    b.pinMode(moisturePower, b.OUTPUT); //set as an output
  }
);

moistureValue = b.analogRead(moisturePin); //Read the SIG (signal) value from the sensor








var b = require('bonescript');

var pumpPin = "P8_8"; // pin that turns on the motor
var moisturePin = "P9_36"; //pin that reads moisture sensor
var moisturePower = "P9_30"; //pin that turns on the moisture sensor

var waterTime = 10; // how long to water (run the pump) in seconds
var waitTime = 120; // how long to wait between reading moisture sensor in minutes
var threshold = 650; //moisture content threshold (set this value for your plant after calibrating moisture sensor)
var moistureValue; //variable for moisture value read by moisture sensor

//run setup function to configure pins on startup
b.pinMode(pumpPin, b.OUTPUT); // set to an output so we can use it to turn on the MOSFET
b.digitalWrite(pumpPin, b.LOW); //set to LOW so pump is not powered on start up
b.pinMode(moisturePower, b.OUTPUT); //set 4 as an output
b.digitalWrite(moisturePower, b.LOW); //set to LOW so sensor is not powered on start up


// I stopped here!!!!!


//create the loop that the arduino will run indefinitely
function plantwatering() {
  readMoisture();

  // Now we are going to check if the water level is below the threashold we set earlier, and if it is run the waterPlant function which controls the pump to water the plant
  if (moistureValue <= threshold) {
    waterPlant();
  }
  delay(waitTime*60000); //wait to take the next moisture sensor reading. Multiply by 60,000 to convert minutes to milliseconds
}

//This is a function used to get the soil moisture content
function readMoisture() {
  b.digitalWrite(moisturePower, HIGH); //turn D4 ON
  delay(1000); //wait one second
  moistureValue = b.analogRead(moisturePin); //Read the SIG (signal) value from the sensor
  b.digitalWrite(moisturePower, LOW); //turn D4 OFF
  return moistureValue; //send current moisture value
}

//This is a function used to run the pump
function waterPlant() {
  b.digitalWrite(pumpPin, HIGH); // turn on the pump
  delay(waterTime * 1000);      //delay turning pump off for a certain length of time defined by waterTime. Multiply by 1000 to translate seconds to milliseconds
  b.digitalWrite(pumpPin, LOW);  // turn off the pump
}
