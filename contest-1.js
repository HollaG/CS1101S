import { show, white, triangle, blue, hollusion, stack, stack_frac, rotate, circle, overlay, red, blank, overlay_frac, translate, beside, flip_horiz, flip_vert, corner, square, scale, sail, scale_independent, quarter_turn_left, quarter_turn_right } from 'rune';



// Set a background color for any rune
const set_bg_fg = (bg, rune) => overlay_frac(0,  (rune), bg(square));

// Create the shape of the moon
const make_moon = (fg, bg) => overlay_frac(0.5,  translate(0.35, 0, scale(1, bg(circle))), fg(circle));

// show(make_moon(blue, red));
// show(set_bg_fg(red, make_moon(white, red)));

// create the stars
const stacked = scale(0.5, scale_independent(1, 1/math_sqrt(2), translate(0, 1, scale_independent(1, 2, beside( quarter_turn_left(triangle), quarter_turn_left(flip_vert(triangle)))))));
const star = ( overlay_frac(0, translate(0, -0.15, stacked), translate(0, 0.15, flip_vert(stacked))));

// create the 5 (n) stars
const calculate_x = (total, index) => math_cos(2 * math_PI / total * index) / 2;
const calculate_y = (total, index) => math_sin(2 * math_PI / total * index) / 2;
const stacker = (total, counter, rune) => {

    return counter === total 
        ? translate(calculate_x(total, counter-1), calculate_y(total, counter - 1), rune) 
        : overlay_frac(0, translate(calculate_x(total, counter-1), calculate_y(total, counter - 1), rune), stacker(total, counter+1, rune) );
    
};

const stars = quarter_turn_left( stacker(6, 1, scale(0.25, star)));
show(stars);

// create the top half of the flag
const stars_and_moon = set_bg_fg(red, beside(scale(0.75, make_moon(white, red)), white(stars)));
const top = beside(stars_and_moon, red(square));

show(stack(top, white(square)));





// show( ( overlay_frac(0, translate(0, -0.15, stacked), translate(0, 0.15, flip_vert(stacked)))));

// show((overlay_frac(0, translate(0.35, 0, scale(1, white(circle))), circle)));

const moon = (overlay_frac(0, translate(0.35, 0, scale(1, red(circle))), white(circle)));





show(quarter_turn_left( stacker(5, 1, scale(0.25, star))));

const top_flag = overlay_frac(0.99, red(square), beside(beside(moon, stacker(5, 1, scale(0.25, star))), blank)   );

show(stack(top_flag, blank  ));


