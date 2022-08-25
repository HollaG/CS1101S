// Q1

    const z = 1;
    function f(g) {
        const z = 3;
        return g(z);
    }
    // const f = g => {
    //     const z = 3;
    //     return g(z);
    // };

    f(y => y + z);


/*
    {
        const z = 3;
        return (y => y + 1)(3);
    }
    
    to
    
    {
        3 + 1
    }
    
    to 
    
    {
        4
    }

*/


// Q2
{
    // general from counter (start) to n
    function my_sum2(n, counter) {
        return counter === n
            ? counter * (counter + 1)
            : (counter * (counter + 1)) + my_sum2(n, counter + 1);
            
    }
    
    function my_sum(n) {
        return n === 1
            ? 2 // n * (n + 1) where n = 1
            : (n * (n + 1)) + my_sum(n - 1);
    }
    
    display(my_sum(10));// 440
} 

// Q3
// Recursive
// Time complexity: Θ(n)
// Space complexity: Θ(n)


// Q4

{ 
    function next(a) {
        return a + 1;
    }
    
    function term(x) {
        return x * (x+1);
    }
    
  
    
    
    // T1: starting number
    // T2: ending number
    // T3: holder value
    // T4: combiner function
    
    function my_sum(n) {
        return sum(1, n, 0, term, next);
    }
    


    // Q5
    
    // recursive
    // function sum(a, b, term, combiner) {
        
    //     return a === b 
    //         ? combiner(a)
    //         : combiner(a) + sum(term(a), b, term, combiner);
    // }
    
    // iterative

    
    function sum(a, b, holder, term, next) {
    
        return a > b // if a === b,
            ? holder // return holder + combiner(a)
            : sum(next(a), b, holder + term(a), term, next);
    }
    
    
    display(my_sum(3)); // 20
    
} 



// Q6
{
    const x = 5;
    function f(g) {
        const x = 3;
        return x => x + g(x);
    }
    function g(f, y) {
        const h = (y, f) => y(f);
        return h(f, y);
    }
    
    // Names declared:
    // x, f(g), g(f, y) in the global scope
    // in f(g) : x, g
    // in g(f, y): h, f, y
    
    
    // Value of (f(x => 2 * x))(4):
    (f(x => 2 * x))(4); // 12
    
    // (x => x + (x => 2 * x)(x))(4)
    // (x => x + (2 * x))(4)
    // (4 + 2*4)
    // 12
    
    
    // Value of g(y => y + 2, x)
    g(y => y + 2, x); // 7
    
    // g(y => y + 2, 5)
    
    //    ((y, f) => y(f))(y => y +2 , 5)
    // (y => y+2)(5)
    // 5+2
    // 7

}



