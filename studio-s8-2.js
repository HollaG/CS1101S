

const SPEED = 200;
const motorA = ev3_motorA();
const motorB = ev3_motorB();


const sensor = ev3_ultrasonicSensor();
const WHEEL_DIAMETER_MM = 56;
const CIRCUMFERENCE = math_PI * 56; // in mm

const DISTANCE_BETWEEN_WHEELS = 83; // mm
const TURNING_CIRCUM = math_PI * DISTANCE_BETWEEN_WHEELS;

function get_degrees_from_distance(circum, dist) {
    // dist is in mm. circum is the wheel circum
    return dist / circum * 360;
}



ev3_motorSetStopAction(motorA, "hold");
ev3_motorSetStopAction(motorB, "hold");


function forward(distance) {
    // mm
    ev3_runToRelativePosition(motorA, -1 * get_degrees_from_distance(CIRCUMFERENCE, distance), SPEED);
    ev3_runToRelativePosition(motorB, -1 * get_degrees_from_distance(CIRCUMFERENCE, distance), SPEED);
    
    ev3_pause(get_pause_duration(SPEED, distance));
}

function rotate(angle) {
    // angle > 0: counterclockwise
    ev3_runToRelativePosition(motorA, get_degrees_from_distance(CIRCUMFERENCE, TURNING_CIRCUM * angle / 360), SPEED);
    ev3_runToRelativePosition(motorB, -get_degrees_from_distance(CIRCUMFERENCE, TURNING_CIRCUM * angle / 360), SPEED);

    
    ev3_pause(get_pause_duration(SPEED, TURNING_CIRCUM * angle / 360));
}

function get_pause_duration(speed, distance) {
    
    // speed: deg/second
    // distance: mm
    const degrees = get_degrees_from_distance(CIRCUMFERENCE, distance); // degrees
    return math_abs(degrees / speed * 1000) + 250;
    
    // return in milliseconds
}

function looper(n) {
    display(ev3_ultrasonicSensorDistance(sensor) / 10);
    ev3_pause(1000);    
    n === 0 ? undefined : looper(n - 1);
}


function looper2() {
    // move forward
    // check distance
    // distance < 10cm: reverse backwards 30cm and stop
    // distance >= 10cm: move forward
    
    
    forward(30);
    const distance = ev3_ultrasonicSensorDistance(sensor) / 10;

    if (distance < 10) {
        forward(-300);
    } else {
        looper();
    }
}

function looper(n) {
    
    
    
    // move forward
    // check distance
    // distance < 10cm: reverse backwards 30cm and stop
    // distance >= 10cm: move forward
    
    
    // forward(30);
    // const distance = ev3_ultrasonicSensorDistance(sensor) / 10;

    // if (distance < 10) {
    //     forward(-300);
    // } else {
    //     looper();
    // }
    
    
    // check distance
    // distance < 10: 
    //     rotate left 
    //     move forward 10cm
    //     rotate right
    //     call the looper()
    // distance > 10
    //     move forward
    // const distance = ev3_ultrasonicSensorDistance(sensor) / 10;
    // if (distance<1 || n === 0) {
    //     return undefined;
        
    // }
    
    // if (distance < 10) {
        
    //     if (is_checking_clear) {
    //         rotate(direction);
            
    //     }
        
    //     const rand = math_random();
    //     display(rand);
    //     if (rand < 0.5) {
    //         rotate(90);
    //         forward(100);
    //         rotate(-90);
            
    //         looper(n-1, true, 90);
            
    //     } else {
    //         rotate(-90);
    //         forward(100);
    //         rotate(90);
            
    //         looper(n-1, true, -90);
    //     }
        
    // } else {
    //     forward(30);
    //     looper(n-1, false, '');
    // }
    
    
    
}



function looper3(n, direction) {
    const distance = ev3_ultrasonicSensorDistance(sensor) / 10;
    if (n === 0) {
        return undefined;
        
    }
    if (distance < 10) {
        // turn in direction
        rotate(direction);
        
        forward(100);
        rotate(-direction);
        
        looper(n-1, direction);
    } else {
        forward(30);
        
        
        looper(n-1, math_random() < 0.5 ? 90 : -90);
    }
}

const dir = math_random() < 0.5 ? 90 : -90;
looper3(75, dir);
