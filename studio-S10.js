function bubblesort_list(L) {
    const len = length(L);
    // let holder = L;
    for (let i = len - 1; i >= 1; i = i - 1) {
        let holder = L;
        for (let j = 0; j < i; j = j + 1) {
            
            // display(holder2, 'holder2');
            if (head(holder) > head(tail(holder))) {
                // swap element in position j with j + 1
                let temp = head(holder);
                display(holder);
                set_head(holder, head(tail(holder)));
                set_head(tail(holder), temp);
                
                
            }
            holder = tail(holder);
        }
}
}

const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]
