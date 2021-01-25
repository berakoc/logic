type NativeObject = {
    [key: string]: any;
};
export const is = Object.is;
export const type = (v: any) => typeof v;
export const isNil = (v: any) => is(v, undefined) || is(v, null);
export const identity = (x: any) => x;
/**
 * A polyfill for Object.fromEntries
 * @param {ArrayLike} keyValuePair An ArrayLike object of key value pairs
 */
export const fromEntries = <T>(keyValuePair: Map<string, T> | [[string, T]]) => {
    if ((Array.isArray(keyValuePair) || keyValuePair instanceof Map) && !isNil(keyValuePair)) {
        const result: NativeObject = {};
        Array.from(keyValuePair).forEach(([key, value]) => (result[key] = value));
        return result;
    }
    throw new Error(`${keyValuePair} is not iterable`);
};
type BiFunction<T, U, R> = (x: T, y: U) => R;
export type CurriedBiFunction<T, U, R> = {
    (t: T): (y: U) => R;
    (t: T, y: U): R;
};
/**
 * Curries the given function
 * @param {Function} f A function with 2nd arity
 */
export const curry = <T, U, R>(f: BiFunction<T, U, R>): CurriedBiFunction<T, U, R> => (
    x: T,
    y?: U
): any => (y === undefined ? (y: U) => f(x, y) : f(x, y));
export const arraysOfKeyValuePairToObject = <T>(keys: string[], values: T[]) => {
    return fromEntries<T>(new Map(keys.map((key, index) => [key, values[index]])));
};
