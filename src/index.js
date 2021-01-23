const { is, type, isNil, identity, curry, arraysOfKeyValuePairToObject } = require('./utils');

const T = true;
const F = false;
/**
 * Does the exact thing of the ternary operator but as a function.
 * @param {Boolean} condition A condition to be fulfilled
 * @param {Function} t A function that will run when the condition is true
 * @param {Function} f A function to be run when the condition is false
 * @param {Array} deps An array of values to be used in return functions
 */
const ternary = (condition, t, f, deps) => (condition ? t(...deps) : f(...deps));
/**
 * Converts a value to Boolean type if it is not. Returns the value if it is Boolean.
 * @param {any} v A value
 */
const Bool = (v) =>
    ternary(
        is(type(v), 'boolean'),
        identity,
        (v) => Boolean(ternary(isNil(v.value), identity, (v) => v.value, [v])),
        [v]
    );
const placeholderKey = '@@logical/not';
const __ = { [placeholderKey]: T };
Object.freeze(__);

/**
 * Constructs a ``Logic`` object. All of the operations in the Logic object (except the value getter) are chaining.
 * If b is `__` then function returns a Logic object with the current value of not(v).
 * @typedef {{and: (v: any) => LogicObject, or: (v: any) => LogicObject, not: (v: any) => LogicObject, xor: (v: any) => LogicObject, value: Boolean }} LogicObject
 * @param {Boolean|any} b A value. If equals to `__` then function runs not and returns the result.
 * @param {any} v Value to be applied on not operator(Since it is unary)
 * @returns {LogicObject}
 */
const Logic = (b, v = null) => {
    const __logic__ = {
        and: (v) => Logic(b && Bool(v)),
        or: (v) => Logic(b || Bool(v)),
        not: (v) => Logic(!Bool(v)),
        xor: (v) =>
            Logic(b)
                .or(v)
                .and(Logic(__, Logic(b).and(v))),
        get value() {
            return b;
        }
    };
    if (is(b, __)) {
        return __logic__.not(v);
    }
    b = Bool(b);
    return __logic__;
};

const functionNames = ['and', 'or', 'xor', 'not'];
const logicFunctions = [(x, y) => x && y, (x, y) => x || y, (x, y) => (x || y) && !(x && y)]
    .map(curry)
    .concat((x) => !x);

module.exports = {
    T,
    F,
    ternary,
    Bool,
    placeholderKey,
    __,
    Logic,
    ...arraysOfKeyValuePairToObject(functionNames, logicFunctions)
};
