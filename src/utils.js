const is = Object.is;
const type = (v) => typeof v;
const isNil = (v) => is(v, undefined) || is(v, null);
const identity = (x) => x;
/**
 * A polyfill for Object.fromEntries
 * @param {ArrayLike} keyValuePair An ArrayLike object of key value pairs
 */
const fromEntries = (keyValuePair) => {
    if ((Array.isArray(keyValuePair) || keyValuePair instanceof Map) && !isNil(keyValuePair)) {
        const result = {};
        Array.from(keyValuePair).forEach(([key, value]) => (result[key] = value));
        return result;
    }
    throw new Error(`${keyValuePair} is not iterable`);
};
/**
 * Curries the given function
 * @param {Function} f A function with 2nd arity
 */
const curry = (f) => (x, y) => (isNil(y) ? (y) => f(x, y) : f(x, y));
const arraysOfKeyValuePairToObject = (keys, values) => {
    return fromEntries(new Map(keys.map((key, index) => [key, values[index]])));
};

module.exports = {
    is,
    type,
    isNil,
    identity,
    curry,
    fromEntries,
    arraysOfKeyValuePairToObject
};
