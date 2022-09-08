const LoL = list(list(1, 2), list(3, 4, 5, 6), null, list(7, 8, 9));

function flatten_list(lst) {
    
    return accumulate((x, y) => {
        return append(x, y);
        
       
    }, null, lst);
    
}

display(LoL);
display(flatten_list(LoL));

const my_tree = list(1, list(2, list(3, 4), 5), list(6, 7));
    
function tree_sum(tree) {
    
    return accumulate((x,y) => {
        if (is_null(x)) {
            return y;
        } else {
            if (is_list(x)) {
                return y + tree_sum(x);
            } else {
                return y + x;
                
            }
        }
        
    }, 0, tree);
    
}

tree_sum(my_tree);




/*function accumulate_tree(f, op, initial, tree) {
     return accumulate((x, y) => {
     
        if (is_list(x)) {
            return op(y, accumulate_tree(f, op, initial, x));
        } else {
            return op(y, f(x));
        }
        
         
     }, initial, tree);
}*/

function accumulate_tree(f, op, initial, tree) {
     return accumulate((x, y) => is_list(x) 
                           ? op(y, accumulate_tree(f, op, initial, x))
                           : op(y, f(x))
         
     , initial, tree);
}

accumulate_tree(x => x, (x, y) => x + y, 0, my_tree);

function count_data_items(tree) {
 return accumulate_tree(x => 1, (x, y) => x + y, 0 , tree);
}

count_data_items(my_tree);

