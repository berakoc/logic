const { __, Logic, placeholderKey } = require('../src/index');
const { is, type, isNil } = require('../src/utils');

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
        const nullish = null
        const expected = true
        expect(isNil(nullish)).toBe(true)
        expect(isNil(false)).toBe(false)
    })
});

describe('Test Logic Functions and the Placeholder(__)', () => {
    it('should validate the placeholder object', () => {
        const isTheOnlyKey = (o, key) => {
            const keys = Object.keys(o);
            return is(keys.length, 1) && is(keys[0], key);
        };
        const doesUniquePlaceholderExist = isTheOnlyKey(__, placeholderKey);
        expect(doesUniquePlaceholderExist).toBe(true);
    });

    it('should run and function properly', () => {
        const pred1 = (v) => v > 3;
        const pred2 = (v) => v < 7;
        const valueSet = [1, 5, 9];
        const expected1 = Logic(pred1(valueSet[0])).and(pred2(valueSet[0])).value;
        const expected2 = Logic(pred1(valueSet[1])).and(pred2(valueSet[1])).value;
        const expected3 = Logic(pred1(valueSet[2])).and(pred2(valueSet[2])).value;
        const expected4 = Logic(false).and(false).value;
        expect(expected1).toBe(false);
        expect(expected2).toBe(true);
        expect(expected3).toBe(false);
        expect(expected4).toBe(false);
    });

    it('should run or function properly', () => {
        const pred1 = (v) => v > 3;
        const pred2 = (v) => v < 7;
        const valueSet = [1, 5, 9];
        const expected1 = Logic(pred1(valueSet[0])).or(pred2(valueSet[0])).value;
        const expected2 = Logic(pred1(valueSet[1])).or(pred2(valueSet[1])).value;
        const expected3 = Logic(pred1(valueSet[2])).or(pred2(valueSet[2])).value;
        const expected4 = Logic(false).or(false).value;
        expect(expected1).toBe(true);
        expect(expected2).toBe(true);
        expect(expected3).toBe(true);
        expect(expected4).toBe(false);
    });

    it('should run xor function properly', () => {
        const pred1 = (v) => v > 3;
        const pred2 = (v) => v < 7;
        const valueSet = [1, 5, 9];
        const expected1 = Logic(pred1(valueSet[0])).xor(pred2(valueSet[0])).value;
        const expected2 = Logic(pred1(valueSet[1])).xor(pred2(valueSet[1])).value;
        const expected3 = Logic(pred1(valueSet[2])).xor(pred2(valueSet[2])).value;
        const expected4 = Logic(false).xor(false).value;
        expect(expected1).toBe(true);
        expect(expected2).toBe(false);
        expect(expected3).toBe(true);
        expect(expected4).toBe(false);
    });

    it('should run not function properly', () => {
        const value = true
        const expectedValue = false
        expect(Logic(__, Logic(value)).value).toBe(expectedValue)
    })
});