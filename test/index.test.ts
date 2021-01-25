import { __, Logic, placeholderKey, ternary, Bool } from '../src/index';
import {
    is,
    type,
    isNil,
    identity,
    curry,
    fromEntries,
    arraysOfKeyValuePairToObject
} from '../src/utils';

describe('Test Utility Functions', () => {
    it('should check if a value is the same with another', () => {
        const s1 = '23';
        const s2 = '23';
        const n = 23;
        const [doesS1EqualToS2, doesS2EqualToN] = [is(s1, s2), is(s2, n)];
        expect(doesS1EqualToS2).toBe(true);
        expect(doesS2EqualToN).toBe(false);
    });

    it('should return the type of the value', () => {
        const secret = Symbol('key');
        const typeOfSecret = type(secret);
        expect(typeOfSecret).toBe('symbol');
    });

    it('should detect if the value type is nil(null or undefined)', () => {
        const nullish = null;
        const expected = true;
        expect(isNil(nullish)).toBe(expected);
        expect(isNil(false)).toBe(false);
    });

    it('should booleanise a value', () => {
        const value = '';
        const logicValue = { value: false };
        const booleanValue = true;
        const actual1 = Bool(value);
        const actual2 = Bool(logicValue);
        const actual3 = Bool(booleanValue);
        expect(actual1).toBe(false);
        expect(actual2).toBe(false);
        expect(actual3).toBe(true);
    });

    it('should return the identical value', () => {
        const actual = identity(7);
        expect(actual).toBe(7);
    });

    it('should run a ternary operation successfully', () => {
        const t = (x: number) => x % 7;
        const f = (x: number) => x + 1;
        const deps = [20];
        const actual1 = ternary(true, t, f, deps);
        const actual2 = ternary(false, t, f, deps);
        expect(actual1).toBe(6);
        expect(actual2).toBe(21);
    });

    it('should curry a second arity functions', () => {
        const add = (x: number, y: number) => x + y;
        const curriedAdd = curry(add);
        expect(curriedAdd(2, 3)).toBe(5);
        expect(curriedAdd(2)(3)).toBe(5);
    });

    it('should convert arrays of key and value pair to an object', () => {
        const keys = ['apple', 'banana'];
        const values = ['red', 'yellow'];
        const actual = arraysOfKeyValuePairToObject(keys, values);
        const expected = {
            apple: 'red',
            banana: 'yellow'
        };
        expect(actual).toStrictEqual(expected);
    });
    it('should return an object from key value pair', () => {
        const keyValuePair = new Map([['key', '@secret']]);
        const actual = fromEntries(keyValuePair);
        const expected = {
            key: '@secret'
        };
        expect(actual).toStrictEqual(expected);
    });
});

describe('Test Logic Functions and the Placeholder(__)', () => {
    it('should validate the placeholder object', () => {
        const isTheOnlyKey = (o: object, key: string) => {
            const keys = Object.keys(o);
            return is(keys.length, 1) && is(keys[0], key);
        };
        const doesUniquePlaceholderExist = isTheOnlyKey(__, placeholderKey);
        expect(doesUniquePlaceholderExist).toBe(true);
    });

    it('should run and function properly', () => {
        const pred1 = (v: number) => v > 3;
        const pred2 = (v: number) => v < 7;
        const valueSet = [1, 5, 9];
        const actual1 = Logic(pred1(valueSet[0])).and(pred2(valueSet[0])).value;
        const actual2 = Logic(pred1(valueSet[1])).and(pred2(valueSet[1])).value;
        const actual3 = Logic(pred1(valueSet[2])).and(pred2(valueSet[2])).value;
        const actual4 = Logic(false).and(false).value;
        expect(actual1).toBe(false);
        expect(actual2).toBe(true);
        expect(actual3).toBe(false);
        expect(actual4).toBe(false);
    });

    it('should run or function properly', () => {
        const pred1 = (v: number) => v > 3;
        const pred2 = (v: number) => v < 7;
        const valueSet = [1, 5, 9];
        const actual1 = Logic(pred1(valueSet[0])).or(pred2(valueSet[0])).value;
        const actual2 = Logic(pred1(valueSet[1])).or(pred2(valueSet[1])).value;
        const actual3 = Logic(pred1(valueSet[2])).or(pred2(valueSet[2])).value;
        const actual4 = Logic(false).or(false).value;
        expect(actual1).toBe(true);
        expect(actual2).toBe(true);
        expect(actual3).toBe(true);
        expect(actual4).toBe(false);
    });

    it('should run xor function properly', () => {
        const pred1 = (v: number) => v > 3;
        const pred2 = (v: number) => v < 7;
        const valueSet = [1, 5, 9];
        const actual1 = Logic(pred1(valueSet[0])).xor(pred2(valueSet[0])).value;
        const actual2 = Logic(pred1(valueSet[1])).xor(pred2(valueSet[1])).value;
        const actual3 = Logic(pred1(valueSet[2])).xor(pred2(valueSet[2])).value;
        const actual4 = Logic(false).xor(false).value;
        expect(actual1).toBe(true);
        expect(actual2).toBe(false);
        expect(actual3).toBe(true);
        expect(actual4).toBe(false);
    });

    it('should run not function properly', () => {
        const value = true;
        const expected = false;
        expect(Logic(__, Logic(value)).value).toBe(expected);
    });
});
