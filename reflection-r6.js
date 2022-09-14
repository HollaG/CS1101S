// question 1
function insert_cmp(x, xs, cmp) {
    return is_null(xs)
        ? list(x)
        : cmp(x, head(xs))
        ? pair(x, xs)
        : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}
function insertion_sort_cmp(xs, cmp) {
    return is_null(xs)
        ? xs
        : insert_cmp(head(xs),
                     insertion_sort_cmp(tail(xs), cmp),
                     cmp);
}

const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);

// 1a
const q1a = insertion_sort_cmp(xs, (x, y) => x < y);
display_list(q1a);


// 1b
const q1b = insertion_sort_cmp(xs, (x, y) => x > y);
display_list(q1b);


// 1c
const q1c = insertion_sort_cmp(xs, (x, y) => false);
display_list(q1c);


// 1d
// if even, x < y
// if odd, y < x
const q1d = insertion_sort_cmp(xs, (x, y) => y % 2 !== 0 
                                            ? y % 2 !== 0 && y < x : y % 2 !== 0 && x < y );
display_list(q1d);

// question 2
// half, rounded downwards
function middle(n) {
    return math_floor(n / 2);
}
// put the first n elements of xs into a list
function take(xs, n) {
    // ...
}
// drop the first n elements from the list and return the rest
function drop(xs, n) {
    // ...
}
// merge two sorted lists into one sorted list
function merge(xs, ys) {
    if (is_null(xs)) { 
        return ys;
    } else if (is_null(ys)) { 
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}
function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs)); 
        return merge(merge_sort(take(xs, mid)), 
        merge_sort(drop(xs, mid)));
    }
}


// 2a
// Running time is O(n)

// 2b
// Running time is O(n^2 logn)

