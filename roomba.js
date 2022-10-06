

const SPEED = 200;
const motorA = ev3_motorA();
const motorB = ev3_motorB();

const eyeMotor = ev3_motorC();
const angle = 4032;
const convert_360_to_angle = (desired_ang) => desired_ang / 360 * 4032;

const sensor = ev3_ultrasonicSensor();
ev3_motorSetStopAction(eyeMotor, "hold");
let i = 0;
for (i = 0; i < 2; i = i + 1) {
    display(ev3_ultrasonicSensorDistance(sensor), "straight");
    display(ev3_ultrasonicSensorDistance(sensor), "straight");
    ev3_runToRelativePosition(eyeMotor, convert_360_to_angle(-25), 1000);
    ev3_pause(1500);
    display(ev3_ultrasonicSensorDistance(sensor), "left");
    display(ev3_ultrasonicSensorDistance(sensor), "left");
    ev3_runToRelativePosition(eyeMotor, convert_360_to_angle(50), 1000);
    ev3_pause(2500);
    display(ev3_ultrasonicSensorDistance(sensor), "right");
    display(ev3_ultrasonicSensorDistance(sensor), "right");
    ev3_runToRelativePosition(eyeMotor, convert_360_to_angle(-25), 1000);
    ev3_pause(1500);
    display(ev3_ultrasonicSensorDistance(sensor), "straight");
    display(ev3_ultrasonicSensorDistance(sensor), "straight");
    display("--------------");
}
display("Program completed");
