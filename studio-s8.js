const motorA = ev3_motorA();
const motorB = ev3_motorB();

// display(ev3_connected(motorA) ? "A connected" : "A not connected");
// display(ev3_connected(motorB) ? "B connected" : "B not connected");

const WHEEL_DIAMETER_MM = 5.6; // Change this
const WHEEL_DIAMETER = WHEEL_DIAMETER_MM / 100;

const DISTANCE_BETWEEN_WHEELS_CM = 10;
const DISTANCE_BETWEEN_WHEELS = DISTANCE_BETWEEN_WHEELS_CM / 100;

const circum_robot = math_PI * DISTANCE_BETWEEN_WHEELS;

// distance travelled in one full rotation of wheel
const distance_one_rotation = math_PI * WHEEL_DIAMETER;

// Required rotation angle to travel `dist` distance
const calculate_rotation = (dist) => dist / distance_one_rotation * 360; 

// Time taken to travel `dist` distance at `speed` speed
const calculate_delay = (dist, speed) => math_abs(calculate_rotation(dist) / speed * 1000);



// ev3_runToRelativePosition(motorA, calculate_rotation(-1), 500);


// ev3_pause(calculate_delay(1, 500));
// ev3_pause(1000);
// ev3_runToRelativePosition(motorA, calculate_rotation(1), 500);
// ev3_pause(calculate_delay(-1, 500));
// // ev3_runToAbsolutePosition(motorA, 0, 100);
// ev3_pause(2000);
// display(ev3_motorGetPosition(motorA));



// ev3_motorSetStopAction(motorSteer, "hold");
// ev3_motorSetStopAction(motorWheelRight, "hold");
// ev3_motorSetStopAction(motorWheelLeft, "hold");

const motor_list = list(motorA, motorB); 
/* Mission Question 2 */
// Travel forward 10cm and stop
function forward(motor_list, distance, speed) {
    const rotation = -1 * calculate_rotation(distance);
    for_each((motor) => {
        ev3_runToRelativePosition(motor, rotation, speed);
    }, motor_list);
    ev3_pause(calculate_delay(distance, speed));
} 
// ev3_runToRelativePosition(motorA, calculate_rotation(-0.10), 100);
// ev3_runToRelativePosition(motorB, calculate_rotation(-0.10), 100);
// ev3_pause(calculate_delay(0.10, 100));

// forward(list(motorA, motorB), 0.10, 100);

ev3_pause(1000);

/* Mission Question 3 */
// Rotate counterclockwise 90degrees
// run each motor for 1/4 the distance of a full circle
function rotate(circum_robot, left_motor, right_motor, angle, is_clockwise, speed) {
    const rotation = calculate_rotation((angle / 360) * circum_robot);
    if (!is_clockwise) {
        ev3_runToRelativePosition(left_motor, rotation, speed);
        ev3_runToRelativePosition(right_motor, -rotation, speed);
    } else {
        ev3_runToRelativePosition(left_motor, -rotation, speed);
        ev3_runToRelativePosition(right_motor, rotation, speed);
    }
    ev3_pause(calculate_delay((angle / 360) * circum_robot, speed));
}

// ev3_runToRelativePosition(motorA, calculate_rotation(circum_robot / 4), 100);
// ev3_runToRelativePosition(motorB, calculate_rotation(circum_robot / -4), 100);
// ev3_pause(calculate_delay(circum_robot / 4, 100));

// rotate(circum_robot, motorA, motorB, 90, false, 100);

ev3_pause(1000);

/* Mission Question 4 */
// move forward 10 cm, 
// turn 90° counterclockwise, 
// then move forward 5 cm, 
// turn 90° clockwise, 
// and finally move forward 15 cm.

const speed4 = 100;
forward(motor_list, 0.10, speed4);
ev3_pause(1000);
rotate(circum_robot, motorA, motorB, 90, false, speed4);
ev3_pause(1000);
forward(motor_list, 0.05, speed4);
ev3_pause(1000);
rotate(circum_robot, motorA, motorB, 90, true, speed4);
ev3_pause(1000);
forward(motor_list, 0.15, speed4);
ev3_pause(1000);





display("Program completed");