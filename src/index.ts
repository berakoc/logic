import {
    is,
    type,
    isNil,
    identity,
    curry,
    arraysOfKeyValuePairToObject,
    CurriedBiFunction
} from './utils';

export const T = true;
export const F = false;
/**
 * Does the exact thing of the ternary operator but as a function.
 * @param {Boolean} condition A condition to be fulfilled
 * @param {Function} t A function that will run when the condition is true
 * @param {Function} f A function to be run when the condition is false
 * @param {Array} deps An array of values to be used in return functions
 */
export const ternary = (condition: boolean, t: Function, f: Function, deps: Array<any>) =>
    condition ? t(...deps) : f(...deps);
/**
 * Converts a value to Boolean type if it is not. Returns the value if it is Boolean.
 * @param {any} v A value
 */
export const Bool = (v: any) =>
    ternary(
        is(type(v), 'boolean'),
        identity,
        (v: LogicObject | any) =>
            Boolean(ternary(isNil(v.value), identity, (v: LogicObject) => v.value, [v])),
        [v]
    );
export const placeholderKey = '@@logical/not';
export const __ = { [placeholderKey]: T };
Object.freeze(__);
type LogicObject = {
    and(v: any): LogicObject;
    or(v: any): LogicObject;
    not(v: any): LogicObject;
    xor(v: any): LogicObject;
    readonly value: boolean;
};
/**
 * Constructs a ``Logic`` object. All of the operations in the Logic object (except the value getter) are chaining.
 * If b is `__` then function returns a Logic object with the current value of not(v).
 * @typedef {{and: (v: any) => LogicObject, or: (v: any) => LogicObject, not: (v: any) => LogicObject, xor: (v: any) => LogicObject, value: Boolean }} LogicObject
 * @param {Boolean|any} b A value. If equals to `__` then function runs not and returns the result.
 * @param {any} v Value to be applied on not operator(Since it is unary)
 * @returns {LogicObject}
 */
export const Logic = (b: boolean | any, v: any = null): LogicObject => {
    const __logic__: LogicObject = {
        and: (v: any) => Logic(b && Bool(v)),
        or: (v: any) => Logic(b || Bool(v)),
        not: (v: any) => Logic(!Bool(v)),
        xor: (v: any) =>
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
const logicFunctions: Array<
    CurriedBiFunction<boolean, boolean, boolean> | ((x: boolean) => boolean)
> = [
    (x: boolean, y: boolean) => x && y,
    (x: boolean, y: boolean) => x || y,
    (x: boolean, y: boolean) => (x || y) && !(x && y)
].map(curry);
const updatedLogicFunctions = logicFunctions.concat((x: boolean) => !x);
const logicals = { ...arraysOfKeyValuePairToObject(functionNames, updatedLogicFunctions) };
type NativeLogicUnit = (a: boolean, b: boolean) => boolean;
type NativeLogicNot = (a: boolean) => boolean;

export const and: NativeLogicUnit = logicals['and'];
export const or: NativeLogicUnit = logicals['or'];
export const not: NativeLogicNot = logicals['not'];
export const xor: NativeLogicUnit = logicals['xor'];
