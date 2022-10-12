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
const calculate_rotation = (dist) => (dist / distance_one_rotation) * 360;

// Time taken to travel `dist` distance at `speed` speed
const calculate_delay = (dist, speed) =>
    math_abs((calculate_rotation(dist) / speed) * 1000);

function rotate(
    circum_robot,
    left_motor,
    right_motor,
    angle,
    is_clockwise,
    speed
) {
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

function rotate_no_pause(
    circum_robot,
    left_motor,
    right_motor,
    angle,
    is_clockwise,
    speed
) {
    const rotation = calculate_rotation((angle / 360) * circum_robot);
    if (!is_clockwise) {
        ev3_runToRelativePosition(left_motor, rotation, speed);
        ev3_runToRelativePosition(right_motor, -rotation, speed);
    } else {
        ev3_runToRelativePosition(left_motor, -rotation, speed);
        ev3_runToRelativePosition(right_motor, rotation, speed);
    }
}

const motor_list = list(motorA, motorB);

function forward(motor_list, distance, speed) {
    const rotation = -1 * calculate_rotation(distance);
    for_each((motor) => {
        ev3_runToRelativePosition(motor, rotation, speed);
    }, motor_list);
    ev3_pause(calculate_delay(distance, speed));
}

const colorSensor = ev3_colorSensor();
const touchSensorBreak = ev3_touchSensor2();

const BLACK_THRESHOLD = 20;
let prev_intensity = 0;
const INTERVAL = 50;

const DISTANCE_FROM_SENSOR_TO_AXLE_CM = 5.5;

function on_line() {
    const val = ev3_reflectedLightIntensity(colorSensor);
    // display(val);
    return val < 20;
}
function start_forward() {
    ev3_motorSetSpeed(motorA, -100);
    ev3_motorSetSpeed(motorB, -100);
    ev3_motorSetStopAction(motorA, "brake");
    ev3_motorSetStopAction(motorB, "brake");
    ev3_motorStart(motorA);
    ev3_motorStart(motorB);
}
function check_running() {
    return ev3_motorGetSpeed(motorA) !== 0 || ev3_motorGetSpeed(motorB) !== 0;
}

start_forward();

while (!ev3_touchSensorPressed(touchSensorBreak)) {
    // WRITE Q3 CODE HERE
    if (!on_line()) {
        // not on the line
        ev3_motorStop(motorA);
        ev3_motorStop(motorB);

        forward(motor_list, DISTANCE_FROM_SENSOR_TO_AXLE_CM / 100, 100);


        // rotate left 120 degrees, then start motors
        // ...

        rotate_no_pause(circum_robot, motorA, motorB, 120, false, 100);
        while (!on_line() && check_running()) {
            // this will run until we hit a line or the motors stop turning
        }

        if (!on_line()) {
            // rotate back 120 degrees
            rotate(circum_robot, motorA, motorB, 120, true, 100);

            rotate_no_pause(circum_robot, motorA, motorB, 120, true, 100);
            while (!on_line() && check_running()) {
                // this will run until we hit a line or the motors stop turning
            }

            if (!on_line()) {
                // still no line, stop the motors
                break;
            } else {
                start_forward();
            }
        } else {
            // found a line
            start_forward();
        }
    } else {
        // on the line
        // don't do anything
    }
}
