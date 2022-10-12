const motorA = ev3_motorA();
const motorB = ev3_motorB();

// display(ev3_connected(motorA) ? "A connected" : "A not connected");
// display(ev3_connected(motorB) ? "B connected" : "B not connected");

const WHEEL_DIAMETER_MM = 5.6; // Change this
const WHEEL_DIAMETER = WHEEL_DIAMETER_MM / 100;

const DISTANCE_BETWEEN_WHEELS_CM = 13.85;
// const DISTANCE_BETWEEN_WHEELS_CM = 13.65;
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

// const speed4 = 100;
// forward(motor_list, 0.10, speed4);
// ev3_pause(1000);
// rotate(circum_robot, motorA, motorB, 90, false, speed4);
// ev3_pause(1000);
// forward(motor_list, 0.05, speed4);
// ev3_pause(1000);
// rotate(circum_robot, motorA, motorB, 90, true, speed4);
// ev3_pause(1000);
// forward(motor_list, 0.15, speed4);
// ev3_pause(1000);

// rotate(circum_robot, motorA, motorB, -90, true, 100);


const colorSensor = ev3_colorSensor();
const touchSensor = ev3_touchSensor2();

const BLACK_THRESHOLD = 20;
let prev_intensity = 0;
const INTERVAL = 50;

const DISTANCE_FROM_SENSOR_TO_AXLE_CM = 5.5;
// while(!ev3_touchSensorPressed(touchSensor)) {
//     display(ev3_reflectedLightIntensity(colorSensor));
//     ev3_pause(100);
// }
// const DISTANCE_FROM_SENSOR_TO_AXLE_CM = 2.5;
/* Mission Q2 */
// while(!ev3_touchSensorPressed(touchSensor)) {   
//     const intensity = ev3_reflectedLightIntensity(colorSensor);
//     if (intensity > BLACK_THRESHOLD) {
//         // line has ended
//         // move forward x cm
//         forward(motor_list, DISTANCE_FROM_SENSOR_TO_AXLE_CM / 100, -200);
//         // rotate left
//         rotate(circum_robot, motorA, motorB, 90, false, 100);
//         display(ev3_reflectedLightIntensity(colorSensor));
//         if (ev3_reflectedLightIntensity(colorSensor) > BLACK_THRESHOLD) {
//             break;
//         }
//         // resume
//     } else {
//         // good, don't do anything
//         ev3_runForTime(motorA, INTERVAL, -200);
//         ev3_runForTime(motorB, INTERVAL, -200);
//         ev3_pause(INTERVAL);
//     }
//     display(ev3_reflectedLightIntensity(colorSensor));
    
// }

/* Mission Q3 */
let ended = false;
let degrees_max = 100;
while(!ev3_touchSensorPressed(touchSensor) && !ended) {   
    const intensity = ev3_reflectedLightIntensity(colorSensor);
    
    // Idea: If is white, move forward,
    // rotate slowly left up to 90degrees, checking if there is any black
    // if there is, stop rotating and move in that direction
    // if not, after 90degrees, rotate 180 degrees right, checking if there is any black
    // if not, stop
    
    if (intensity > BLACK_THRESHOLD) {
        forward(motor_list, DISTANCE_FROM_SENSOR_TO_AXLE_CM / 100, -200);
        let found_black_line_left = false;
        let gave_up_left = false;
        let rotation_angle = 0;
        while(!found_black_line_left && !gave_up_left) {
            display(ev3_reflectedLightIntensity(colorSensor));
            rotate(circum_robot, motorA, motorB, 2, false, 100);
            rotation_angle = rotation_angle - 2;
            if (ev3_reflectedLightIntensity(colorSensor) < BLACK_THRESHOLD) {
                found_black_line_left = true;
                break;
            }
            if (rotation_angle <= -degrees_max) {
                // switch to rotating right
                gave_up_left = true;
                rotate(circum_robot, motorA, motorB, math_abs(rotation_angle), true, 100);
                rotation_angle = 0;
            }
        }
        while(gave_up_left) {
            display(ev3_reflectedLightIntensity(colorSensor));
            rotate(circum_robot, motorA, motorB, 2, true, 100);
            rotation_angle = rotation_angle + 2;
            if (ev3_reflectedLightIntensity(colorSensor) < BLACK_THRESHOLD) {
                // let the loops carry on
                break;
            }
            if (rotation_angle >= degrees_max) {
                // rotate back to start and stop
                rotate(circum_robot, motorA, motorB, rotation_angle, false, 100);
                ended = true;
                break;
            }
        }
        
    } else {
        // good., don't do anything
        ev3_runForTime(motorA, INTERVAL, -200);
        ev3_runForTime(motorB, INTERVAL, -200);
        ev3_pause(INTERVAL);
    }
    
    display(ev3_reflectedLightIntensity(colorSensor));
}









display("Program completed");