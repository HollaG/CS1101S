// Question 1
// function my_map(f, xs) {
//     // return accumulate((x, y) => append(list(f(x)), y), list(), xs);
//     return accumulate((x, y) => pair((f(x)), y), null, xs);
// }

// my_map(x => x + 1, list(1,2,3));

// // Question 2
function check_if_exists(element, to_compare) {
    // filter the to_compare
    return length(filter(e => e === element, to_compare)) !== 0; // true if exists
    
}
function remove_duplicates(lst) {
    // iterate the list
    // add any seen ones to the new list
    // const iter = (lst, seen) => {
    //     return is_null(lst) 
    //         ? seen
    //         : check_if_exists(head(lst), seen)
    //         ? iter(tail(lst), seen)
    //         : iter(tail(lst), append(seen, list(head(lst))));
    // };
    
    // return iter(lst, list());
    
    
    return accumulate((x, y) => {
        return check_if_exists(x, y) 
            ? y
            : append(y, list(x));
    }, list(), lst);
    // const iter = (lst, seen) => {
    //     return is_null(lst) 
    //         ? seen
    //         : check_if_exists(head(lst), seen)
    //         ? iter(tail(lst), seen)
    //         : iter(tail(lst), pair(seen, (head(lst))));
    // };
    
    // return iter(lst, null);
}


display_list(remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2)));
display_list(remove_duplicates(list("a", "x", "b", "c", "c", "b", "d")));


function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));
  
        // Combinations that do not use the head coin
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        // Combinations that use the head coin.
        const combi_C = map(lst => pair(head(coins), lst) , combi_B);
        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1),
//              list(1, 10, 5, 1, 5))


