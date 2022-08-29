const pascal = (row, position) => {
    
    return row < position 
        ? 0 // invalid, there is no number corresponding to this
        : row === 0 || position === 0
        ? 1 
        : pascal(row - 1, position - 1) + pascal(row - 1, position); 
};

display(pascal(4, 3)); // 4

pascal(3, 2) + pascal(3, 3);


pascal(2, 1) + pascal(2, 2) + pascal(2, 2) + pascal(2, 3); // pascal(2,3) === 0


pascal(1, 0) + pascal(1, 1)
    + 
pascal(1, 1) + pascal(1, 2) // pascal(1, 2) === 0
    +
pascal(1, 1) + pascal(1, 2);


1 + pascal(0, 0) + pascal(0, 1) // pascal(0, 1) === 0
    +
pascal(0, 0)
    +
pascal(0, 0);

1 + 1 
    + 
1
    +
1;



function sum(term, a, next, b) {
    return a > b
           ? 0
           : term(a) + sum(term, next(a), next, b);
}

function inc(n) {
    return n + 1;
}

function identity(x) {
    return x;
}

function simpson(a, b, n, f) {
    
    return sum(f(a + ))
    
}






