# Logic
![GitHub](https://img.shields.io/github/license/MuhammedBeraKoc/logic?color=f72585)
![npm](https://img.shields.io/npm/v/lgc?color=4361ee)
[![build](https://circleci.com/gh/MuhammedBeraKoc/logic.svg?style=shield)](https://app.circleci.com/pipelines/github/MuhammedBeraKoc/logic)
![David](https://img.shields.io/david/dev/MuhammedBeraKoc/logic)

## What is Logic?
Logic is a library for handling logical operations with functional programming.

## Installation
To use with node:
```bash
npm install lgc
```
To access the library:
```js
const lgc = require('lgc')
```

## Usage
### `Logic`
In the heart of the library, there lies `Logic` function. Not to be confused, it is not a constructor. However it is the function that we use to create logical fragments. You can import `Logic` directly from library:
```js
const { Logic } = require('lgc')
```
Logic is a function that utilises functional chaining:
```js
const amIHappy = Logic(isTodayHoliday()).or(isWeatherSunny()).value
```
Logic also supports autoboxing `Logic objects`. Hence you have to use `value` property when you want to get the boolean value since each operation returns another `Logic Object` instead of `Boolean` value:
```js
const result = Logic(Logic(true).xor(false)).value
```
`Logic` supports 4 basic logical operators: `and`, `or`, `xor` and `not`
### `not` Operator
Not operator is a special case. It is the only `unary` function. Using it is a little bit different than others:
```js
const { __ } = require('lgc')
const gte = (x, y) => x >= y
const result = Logic(__, gte(3, 5)).value
```
`__` is a special object which contains one key as `@@logical/not`. When it is used as first parameter, Logic function -instead of returning Logic object- returns the result of `not` operation. Also you can use `not` as a normal operator. However keep in mind that using `not` explicitly will remove early value which comes from the function chain. Because of that I highly discourage you from using it explicitly.
```js
// Even though we have true as our previous value, it will be discarded in not operation
const isTrue = Logic(true).not(false).value
```
### A Basic Example
Let us try to convert `(x || y) && !(x ^ (y && !x))` to a reusable logical fragment chain:
```js
// L is just a shorthand version of Logic
const { L } = require('lgc')
const myLogicalFragment = (x, y) => L(L(x).or(y)).and(L(__, L(L(x).xor(L(y).and(L(__, x))))))
```
Quite a mess, isn't it? No worry! There is another way of computing logical operations using `Logic` library. However by chaining we can access and use previous values. This is a big plus which makes up for the enormous complexity.
### Pure Operators
`Logic` library is not only restricted with Logic function. There is a purer(!) way of using logical operators:
```js
const { and, or, not, xor } = require('lgc')
console.log(and(true)(false))
console.log(or(false, false))
console.log(not(false))
console.log(xor(true)(true))
```
Using those basic functions you can easily compute the result of a logical operation. They are also curried which means they can be either used as `op(x, y)` or `op(x)(y)` which let's you those operators with a constant parameter:
```js
const alwaysFalse = and(false)
console.log(alwaysFalse(true))
```
They can't be chained contrary to `Logic object`. 
### Utility Functions
`ternary(predicate: (any) => Boolean, trueFunction: Function, falseFunction: Function, deps: Array)`: Functional implementation of ternary if operator.  
`Bool(v: any)`: Takes a value and converts it to the boolean. Applicable for `Logic objects`.  
`T: true`: A variable for `true`  
`F: false`: A variable for `false`

## License
The project is licensed under MIT Open-source License.
