const is = Object.is;
const type = (v) => typeof v;
const isNil = (v) => is(v, undefined) || is(v, null);
const identity = (x) => x;
/**
 * Curries the given function
 * @param {Function} f A function with 2nd arity
 */
const curry = (f) => (x, y) => (isNil(y) ? (y) => f(x, y) : f(x, y));
const arraysOfKeyValuePairToObject = (keys, values) => {
    return Object.fromEntries(new Map(keys.map((key, index) => [key, values[index]])));
};

module.exports = {
    is,
    type,
    isNil,
    identity,
    curry,
    arraysOfKeyValuePairToObject
};
