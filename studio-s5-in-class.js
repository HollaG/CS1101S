

function every_second(items) {
    
    // function recur(items, index) {
        
    
    //     return is_null(items)
    //         ? null
    //         : index % 2 === 1
    //         ? pair(head(items), recur(tail(items),  index +  1))
    //         : recur(tail(items), index +  1);
    // }
        
    // return recur(items, 0);
    // const iter(items, result) => {
        
    //     return is_null(items)
    //         ? result
    //         : length(items) % 2 === 0 
    //         ? iter(tail(items), pair(   )))
    // };
    
    // return iter(items, null)
    
    
    
  
    return is_null(tail(items)) || is_null(tail(tail(items)))
        ? null
        : pair(list_ref(items, 1), every_second(
                                                     tail(tail(items))));
}

every_second(list("a", "x", "b", "y", "c", "z", "d", "1", "2"));

// pair("x", pair("y", pair("z", null)));

// pair("a", restOfList)