const { is, type, isNil } = require('./utils');

/**
 * Converts a value to Boolean type if it is not. Returns the value if it is Boolean.
 * @param {any} v A value
 */
const Bool = (v) => (is(type(v), 'boolean') ? v : Boolean(isNil(v.value) ? v : v.value));
const placeholderKey = '@@logical/not';
const __ = { [placeholderKey]: true };
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

module.exports = {
    placeholderKey,
    __,
    Logic
};
