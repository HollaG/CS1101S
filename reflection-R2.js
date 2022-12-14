/* ----------- Problem 1 ----------- */
/*
    The function gives rise to a recursive process.
*/

/* ----------- Problem 2 ----------- */
/*
    A step can be defined as (a) a function call, (b) an arithmetic operation, 
    (c) an evaluation, or some combination of the above.
    
    Count the number of evaluations or primitive operations.
    The key is to be consistent.
*/

/* ----------- Problem 3 ----------- */
function factorial(n) {
    return n === 1
        ? 1
        : n * factorial(n - 1);
}

factorial(5);
/*
    a) n steps --> O(n) time
    It takes 5 steps for n = 5.
    
    b+c+a) n steps --> O(2n-1) --> O(n) time
    It takes 9 steps for n = 5.
*/


/* ----------- Problem 4 ----------- */
/*
    4 deferred operations.
    Look at the line with the most number of deferred operations.
    
    Space complexity: O(n-1) --> O(n)
*/

/* ----------- Problem 5 ----------- */
function factorial2(n) {
    return iter(1, 1, n);
}
function iter(product, counter, n) {
    return counter > n
        ? product
        : iter(counter * product, counter + 1, n);
}

// factorial2(5);

/*
    It also takes 6 steps. (n+1)
*/

/* ----------- Problem 6 ----------- */
/*
    Constant space.
    There is only one function stored at a time and no deferred operations. (?)
*/

/* ----------- Problem 7 ----------- */
/*  
    Recursive.
*/

/* ----------- Problem 8 ----------- */
function fib(n) {
    return fib_iter(1, 0 , n);
}
function fib_iter(a, b, count) {
    return count === 0
        ? b
        : fib_iter(a + b, a, count - 1);
}

fib(5);
/*
    It takes n steps
*/


/* ----------- Problem 2 ----------- */
/*

*/

