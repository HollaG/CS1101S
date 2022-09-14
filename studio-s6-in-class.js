// // Question 1
// function check_if_exists(element, to_compare) { // 
//     // filter the to_compare
//     return length(filter(e => e === element, to_compare)) !== 0; // true if exists
    
// }
// function remove_duplicates(lst) {
    
//     // return accumulate((x, y) => {
//     //     return is_null(member(x, y)) // member(x, y) is null if x not in y, so is_null is true if x not in y
//     //         ? append(y, list(x))
//     //         : y;
//     // }, list(), lst);
//     return accumulate((x, y) => {
//         return is_null(member(x, y)) // member(x, y) is null if x not in y, so is_null is true if x not in y
//             ? pair(y, (x))
//             : y;
//     }, null, lst);
    
// }

// remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2));
// // Result: list(1, 2, 3, 4)
// display_list(remove_duplicates(list("a", "x", "b", "c", "c", "b", "d")));
// Result: list("a", "x", "b", "c", "d")


function subsets(xs) {
  
        
    if (is_null(xs)) { return list(null); } else { 
        // add the empty set
        const final_list = list();
        // add subsets of length 1
        
        // add subsets of length ... until length(xs) -1
        // const iter = (xs, holder) => {
        //     // for every element in xs, either pick it or dont
            
        //     const picked = is_null(xs) ? holder : iter(tail(xs), append(holder, head(xs)));
        //     const not_picked = is_null(xs) ? holder : iter(tail(xs), holder);
            
        //     return list(picked, not_picked);
         
        // };
        // return iter(xs, list());
        // add xs
        // return append(final_list, xs);
        
        // case 1: pick element
        // const list_picked_element = pair(head(xs), subsets(tail(xs)));
        // case 2: don't pick element
        const list_unpicked_element = subsets(tail(xs));
        
        const final = map(x => pair(head(xs), x), list_unpicked_element);
        return append(list_unpicked_element, final);
    
}   }


display_list(subsets(list(1, 2, 3)));
// Result: list(list(),
// list(1), list(2), list(3),
// list(1,2), list(1,3), list(2,3),
// list(1,2,3))