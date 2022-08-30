import { show, white, triangle, blue, hollusion, stack, stack_frac, rotate, circle, overlay, red, blank, overlay_frac, translate, beside, flip_horiz, flip_vert, corner, square, scale, sail, scale_independent, quarter_turn_left, quarter_turn_right } from 'rune';

// My contest entry
function runes_contest() {
    // just for fun :)   
     
    // Predefined colors, change these for changing flag color
    const FLAG_BG_TOP_FUNC = red;
    const FLAG_BG_BOTTOM_FUNC = white;
    
    // Set a background color for any rune
    const set_bg_color = (bg, rune) => overlay_frac(0,  rune, bg(square));
    
    // Create the shape of the moon
    const make_moon = (fg, bg) => overlay_frac(0.5,  
                                               translate(0.35, 
                                                         0, 
                                                         bg(circle)), 
                                               fg(circle));
    
    
    
    // create the stars
    // 1) Create an equilateral triangle
    const stacked = scale(0.5, 
                          scale_independent(1, 
                                            1 / math_sqrt(2), 
                                            translate(0, 
                                                      1, 
                                                      scale_independent(1, 
                                                                        2, 
                                                                        beside(quarter_turn_left(triangle), 
                                                                               quarter_turn_left(flip_vert(triangle)))))));
    
    const star = overlay_frac(0, 
                              translate(0, -0.15, stacked), 
                              translate(0, 0.15, flip_vert(stacked)));
    
    // create the 5 (n) stars
    const calculate_x = (total, index) => math_cos(2 * math_PI / total * index) / 2;
    const calculate_y = (total, index) => math_sin(2 * math_PI / total * index) / 2;
    const stacker = (total, counter, rune) => {
        return counter === total 
            ? translate(calculate_x(total, counter - 1), 
                        calculate_y(total, counter - 1), 
                        rune) 
            : overlay_frac(0, 
                           translate(calculate_x(total, counter - 1), 
                                     calculate_y(total, counter - 1), 
                                     rune), 
                           stacker(total, counter + 1, rune));
    };
    
    // quarter_turn_left because we want 2 stars to be at the bottom
    const stars = quarter_turn_left(stacker(5, 1, scale(0.25, star)));
    
    // create the top half of the flag
    const stars_and_moon = set_bg_color(FLAG_BG_TOP_FUNC, 
                                        beside(scale(0.75, 
                                                     make_moon(FLAG_BG_BOTTOM_FUNC, 
                                                               FLAG_BG_TOP_FUNC)), 
                                               FLAG_BG_BOTTOM_FUNC(stars)));
    
    // create a base flag layer
    const empty_flag = stack(FLAG_BG_TOP_FUNC(square), FLAG_BG_BOTTOM_FUNC(square));
    
    const flag = stack(stars_and_moon, FLAG_BG_BOTTOM_FUNC(square));
    
    const bigFlag = beside(stack(empty_flag, flag), stack(flag, empty_flag));
    
    return bigFlag;

}



// Keep this show function call
show(runes_contest());
