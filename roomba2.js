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
const touchSensorLeft = ev3_touchSensor2();
const touchSensorRight = ev3_touchSensor4();

const gyroSensor = ev3_gyroSensor();

const distanceSensor = ev3_ultrasonicSensor();
const INTERVAL = 50;
const speed = 600;
function start_forward() {
    ev3_motorSetSpeed(motorA, -speed);
    ev3_motorSetSpeed(motorB, -speed);
    ev3_motorSetStopAction(motorA, "brake");
    ev3_motorSetStopAction(motorB, "brake");
    ev3_motorStart(motorA);
    ev3_motorStart(motorB);
}



// start_forward();

let dir = 0;

// while (!ev3_touchSensorPressed(touchSensorRight)) {
//     display(ev3_gyroSensorRate(gyroSensor), 'gyro');
//     ev3_pause(100);
// }

let prevRate = 0;
function check_is_stuck(prevRate, currentRate) {
    display(prevRate, 'prevRate');
    display(currentRate, 'currentRate');
    const res = math_abs(prevRate - currentRate) < 5 && prevRate !== 0;
    // && -90 < currentRate && currentRate < -80;
    display(res, 'res');
    return  res;
}
while (!ev3_touchSensorPressed(touchSensorRight) || !ev3_touchSensorPressed(touchSensorLeft)) {
    const sensorRate = ev3_gyroSensorRate(gyroSensor);
    
    const dist = ev3_ultrasonicSensorDistance(distanceSensor) / 10;
   
    
    if (ev3_touchSensorPressed(touchSensorLeft)) {
        // turn right
        rotate(circum_robot, motorA, motorB, 25, true, speed);
        // if (check_is_stuck(prevRate, sensorRate)) {
        //     forward(motor_list, -0.15, speed);
        //     continue;
        // }
        dir = 1;
        start_forward();
    } else if (ev3_touchSensorPressed(touchSensorRight)) {
        // turn left
        rotate(circum_robot, motorA, motorB, 25, false, speed);
        // if (check_is_stuck(prevRate, sensorRate)) {
        //     forward(motor_list, -0.15, speed);
        //     continue;
        // }
        
        dir = -1;
        start_forward();
    } else {
        
        if ((dist < 15 && dir === 0) || (dist < 25 && dir !== 0)) {
            
            // roll a random direction
            // 1: clockwise
            // -1: anticlockwise
            
            if (dir === 0) {
                // the robot hasn't just come from turning
                dir = math_random() > 0.5 ? 1 : -1;
            }
            
            display(dir);
            ev3_motorStop(motorA);
            ev3_motorStop(motorB);
            
            if (dir === -1) {
                ev3_motorSetSpeed(motorA, speed);
                ev3_motorSetSpeed(motorB, -speed);
                
            } else {
                ev3_motorSetSpeed(motorA, -speed);
                ev3_motorSetSpeed(motorB, speed);
               
            }
            
            ev3_motorStart(motorA);
            ev3_motorStart(motorB);
            
            // if (check_is_stuck(prevRate, sensorRate)) {
            //     forward(motor_list, -0.15, speed);
            //     continue;
            // }
             prevRate = sensorRate;
        } else {
            prevRate = 0;
            start_forward();
            dir = 0;
           
        }
        
        // if (dist < 10) {
        //     // turn 
        //     // rotate(circum_robot, motorA, motorB, 10, false, 200);
        //     // start_forward();
            
        //     // stop
        //     ev3_motorStop(motorA);
        //     ev3_motorStop(motorB);
        //     // scan left
        //     rotate(circum_robot, motorA, motorB, 45, false, 200);
        //     // get distance left
        //     let dist_left = ev3_ultrasonicSensorDistance(distanceSensor) / 10;
        
        //     // scan right
        //      rotate(circum_robot, motorA, motorB, 45, true, 200);
        //     // get distance right
        //     let dist_right = ev3_ultrasonicSensorDistance(distanceSensor) / 10;
            
        //     display(dist_right, "right");
        //     display(dist_left, "left");
        //     // go X direction
        //     if (dist_left > dist_right) {
        //         rotate(circum_robot, motorA, motorB, 90, false, 200);
        //         start_forward();
        //     } else {
        //         start_forward();
        //     }
            
          
        // } else if (dist === 255) {
        //     // reverse for a bit
        //     forward(motor_list, -0.05, 200);
        //     rotate(circum_robot, motorA, motorB, 25, true, 200);
            
        // } else {}
    }
    
    
    
}


// while (!ev3_touchSensorPressed(touchSensorRight) || !ev3_touchSensorPressed(touchSensorLeft)) {
 
//     const dist = ev3_ultrasonicSensorDistance(distanceSensor) / 10;
//     display(dist);
    
//     if (ev3_touchSensorPressed(touchSensorLeft)) {
//         // turn right
//         rotate(circum_robot, motorA, motorB, 25, true, 100);
//     } else if (ev3_touchSensorPressed(touchSensorRight)) {
//         // turn left
//         rotate(circum_robot, motorA, motorB, 25, false, 100);
//     } else {
//         if (dist < 15) {
//             // turn 
//             rotate(circum_robot, motorA, motorB, 10, false, 100);
          
//         } else {
//             ev3_runForTime(motorA, INTERVAL, -200);
//             ev3_runForTime(motorB, INTERVAL, -200);
//             ev3_pause(INTERVAL);
//         }
//     }
// }












display("Program completed");