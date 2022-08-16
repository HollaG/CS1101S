// Classic Single Combo
// Classic Double with Cheese Combo
// Classic Triple with Cheese Combo
// Avant-Garde QUadruple with Guacamole Combo

const combo1 = 1;
const combo2 = 2;
const combo3 = 3;
const combo4 = 4;

const bigCombo1 = 5;
const bigCombo2 = 6;
const bigCombo3 = 7;
const bigCombo4 = 8;

/* ----------- Question 1 ----------- */

function biggie_size(regularCombo) { 
    return regularCombo + 4;
}

// test
display(biggie_size(combo1)); // 5
display(biggie_size(combo4)); // 8

/* ----------- Question 2 ----------- */

function unbiggie_size(bigCombo) { 
    return bigCombo - 4;   
}

// test
display(unbiggie_size(bigCombo1)); // 1
display(unbiggie_size(bigCombo4)); // 4

/* ----------- Question 3 ----------- */

function is_biggie_size(combo) { 
    return combo > 4; 
    // return combo >= 5;
}

// test
display(is_biggie_size(bigCombo3)); // true
display(is_biggie_size(combo3)); // false


/* ----------- Question 4 ----------- */

function combo_price(combo) {
    return is_biggie_size(combo) 
        ? unbiggie_size(combo) * 1.17 + 0.5 
        : combo * 1.17;
}

// test
display(combo_price(combo2)); // 2.34
display(combo_price(bigCombo2)); // 2.84

/* ----------- Question 5 ----------- */

function empty_order() { 
    return 0;
}

/* ----------- Question 6 ----------- */

// oldOrder: string; combo: string
// function add_to_order(oldOrder, combo) {
//     return oldOrder + combo;
//     // return `${oldOrder}${newOrder}`;
// }

function add_to_order(oldOrder, combo) {
    return oldOrder * 10 + combo;
}

// test
display(add_to_order(1, 2)); // 12

/* ----------- Question 7 ----------- */

function last_combo(order) {
    return order % 10;
}

// test
display(last_combo(321)); // 1

/* ----------- Question 8 ----------- */

function other_combos(order) {
    // return (order - last_combo(order)) / 10;
    return math_floor(order / 10);
}

// test 
display(other_combos(321)); // 32


