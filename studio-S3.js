import { beside, blank, heart, square,stack, show, ribbon, circle, beside_frac, stack_frac, make_cross } from 'rune';

// function f1(rune_1, n, rune_2) {
//     return n === 0
//         ? rune_2
//         : f1(rune_1, n - 1, beside(rune_1, stack(blank, rune_2)));
// }

// // show(f1(square, 3, heart));

// // show(f1(square, 3, heart));
// // show(f1(square, 2, beside(square, stack(blank, heart))));
// // show(f1(square, 1, beside(square, stack(blank, beside(square, stack(blank, heart))))));
// // // rune2 is 
// // show(f1(square, 0, beside(square, stack(blank, beside(square, stack(blank, beside(square, stack(blank, heart))))))));




// // show(f1(square, 0, heart));
// // show(f1(square, 1, heart));
// // show(f1(square, 2, heart));
// // show(f1(square, 3, heart));




// function f2(rune, n) {

//     return n === 0
//         ? rune
//         : stack(beside(blank, f2(rune, n - 1)), square);
// }

// show(f2(heart, 0));
// show(f2(heart, 1));
// show(f2(heart, 2));
// show(f2(heart, 3));
// // stack(beside(blank, f2(heart, 2)), square);

// // stack(beside(blank, stack(beside(blank, f2(heart, 1)), square)), square);

// // show(stack(beside(blank, stack(beside(blank, stack(beside(blank, heart), square)), square)), square));


// // show(stack(beside(blank, stack(beside(blank, heart), square)), square));


// show(ribbon);

// function moony_1(bottom_right) {
//     return beside(stack(circle, square), stack(blank, bottom_right));
// }

// show(moony_1(ribbon));

function moony_2(n) {
    
    return n === 1
        ? circle
        : beside(stack(circle, square), stack(blank, moony_2(n-1)));
    
}

// show(moony_2(5));

function moony_3(n) {
    
    return n === 1
        ? circle
        : beside_frac(1/n, stack_frac(1/n, circle, square), stack_frac(1/n, blank, moony_3(n-1)));
    
}


function moony_iter(n, total, rune) {
    
    return n === total 
        ? circle
        : moony_iter(n+1, total, beside_frac(1-(1/n), stack_frac(1-(1/n), circle, square), stack_frac(1-(1/n), blank, rune)) );
    
}
show(moony_iter(1, 5, circle));

// show(make_cross( make_cross(moony_3(20))));

// beside_frac(1/3, stack_frac(1/3, circle, square), stack_frac(1/3, blank, moony_3(2)));

// show(beside_frac(
//     1 / 3,
//     stack_frac(1 / 3, circle, square),
//     stack_frac(
//         1 / 3,
//         blank,
//         beside_frac(
//             1 / 2,
//             stack_frac(1 / 2, circle, square),
//             stack_frac(1 / 2, blank, circle)
//         )
//     )
// ));

/*
    recursive.
    
    O(n) 
    




*/















