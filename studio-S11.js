
function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
        ? s1
        : pair(head(s1) + head(s2), () =>
              add_streams(stream_tail(s1), stream_tail(s2))
          );
}
function scale_stream(c, stream) {
    return stream_map((x) => c * x, stream);
}
const add_series = add_streams;
const scale_series = scale_stream;
function negate_series(s) {
    return scale_series(-1, s);
}
function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) {
        return is_null(list) ? zeros : pair(head(list), () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

function integers_from(n) {
    return pair(n, () => integers_from(n + 1));
}
const non_neg_integers = integers_from(0);

const alt_ones = pair(1, () => negate_series(alt_ones));
const alt_ones_2 = pair(1, () => scale_series(-1, alt_ones_2));
display(eval_stream(alt_ones, 10), 'alt_ones');
display(eval_stream(alt_ones_2, 10), 'alt_ones_2');

const zeroes = pair(0, () => scale_series(0, alt_ones_2));
const zeroes_2 = pair(0, () => add_series(alt_ones_2, negate_series(alt_ones_2)));
const zeroes_3 = pair(0, () => subtract_series(alt_ones_2, alt_ones_2));
display(eval_stream(zeroes_2, 10), 'zeroes_1');
display(eval_stream(zeroes_2, 10), 'zeroes_2');
display(eval_stream(zeroes_3, 10), 'zeroes_3');


const s1 = fun_to_series(x => 1);
const s2 = fun_to_series(x => x + 1);
display(eval_stream(s1, 10));
display(eval_stream(s2, 10));




